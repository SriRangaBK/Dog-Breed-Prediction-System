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
@api_view(['POST'])
def predict_view(request):  
    load_dotenv()
    GOOGLE_API_KEY = os.getenv("GEMINI_API_KEY")
    try:

        if 'image' not in request.FILES:
            return Response({"error": "No image uploaded"}, status=400)

        image_file = request.FILES['image']

        file_path = default_storage.save(f"uploads/{image_file.name}", image_file)
        full_path = os.path.join(default_storage.location, file_path)

        breed, confidence = predict_breed(full_path)

        client = genai.Client(api_key=GOOGLE_API_KEY)

        prompt=f"""
                You are a dog expert.
                Provide short information about the dog breed: {breed}
                Include:
                1. 2-3 lines about the breed
                2. Temparment
                3. Average price in India
                Output:
                Return the response as following
                {{
                    "info":"...",
                    "temparment":"...",
                    "price":"..."(Give only numeric value)
                }}
                """

        gemini_response = client.models.generate_content(
            model="gemini-2.0-flash-lite", 
            contents=prompt
        )
        description=gemini_response.text
        

    except Exception as e:

        print("Prediction error:", e)

        return Response({
            "error": str(e)
        }, status=500)