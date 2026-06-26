import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from .predict import predict_breed
from google import genai
from dotenv import load_dotenv
import json
# @api_view(['POST'])
# def predict_view(request):
    
#     if 'image' not in request.FILES:
#         return Response({"error": "No image uploaded"}, status=400)

#     image_file = request.FILES['image']
#     file_path = default_storage.save(image_file.name, image_file)

#     full_path = os.path.join(default_storage.location, file_path)

#     breed, confidence = predict_breed(full_path)

#     return Response({
#         "breed": breed,
#         "confidence": round(confidence * 100, 2)
#     })
load_dotenv()
GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GOOGLE_API_KEY)
@api_view(['POST'])
def predict_view(request):  

    try:

        if 'image' not in request.FILES:
            return Response({"error": "No image uploaded"}, status=400)

        image_file = request.FILES['image']

        file_path = default_storage.save(f"uploads/{image_file.name}", image_file)
        full_path = os.path.join(default_storage.location, file_path)

        breed, confidence = predict_breed(full_path)

        

        prompt = f"""
        You are a canine nutrition expert.

        Provide information for the dog breed: {breed}.

        Requirements:
        1. info: Brief description (2-3 sentences).
        2. temperament: Comma-separated personality traits.
        3. price: Average purchase price in India as an integer only.
        4. diet: Mention:
        - Recommended foods
        - Foods to avoid
        - Daily feeding frequency for adults

        Return ONLY valid JSON.

        {{
            "info": "",
            "temperament": "",
            "price": 0,
            "diet": {{
                "recommended_foods": "",
                "avoid_foods": "",
                "feeding_frequency": ""
            }}
        }}
        """

        gemini_response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )

        text = gemini_response.text.strip()

        # Remove markdown code fences if present
        text = text.replace("```json", "").replace("```", "").strip()

        description = json.loads(text)

        return Response({
        "breed": breed,
        "confidence": round(confidence * 100, 2),
        "desc": description
        })

    except Exception as e:

        print("Prediction error:", e)

