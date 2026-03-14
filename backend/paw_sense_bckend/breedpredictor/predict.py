import json
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input
from .model_loader import model
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

CLASS_PATH = os.path.join(BASE_DIR, "models", "class_names.json")

with open(CLASS_PATH) as f:
    class_names = json.load(f)


def predict_breed(img_path):

    img = image.load_img(img_path, target_size=(299,299))
    img_array = image.img_to_array(img)

    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    prediction = model.predict(img_array)

    predicted_index = np.argmax(prediction)
    confidence = float(np.max(prediction))

    breed = class_names[predicted_index]

    return breed, confidence