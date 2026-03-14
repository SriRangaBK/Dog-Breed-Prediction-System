import os
from tensorflow.keras.models import load_model


MODEL_PATH = r"C:\Pawsense\backend\models\inceptionv3_dog_classifier.h5"
model = load_model(MODEL_PATH)