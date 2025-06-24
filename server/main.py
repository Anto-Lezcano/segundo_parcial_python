from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# carga de archivos pkl
model = joblib.load('./model/modelo_consumo_nafta.plk')
features = joblib.load('./model/features.pkl')

app = FastAPI(title='Consumo de Nafta')

MODEL_SCORE = 0.5

class PrediccionInput(BaseModel):
    distancia_km: float
    tiempo_min: float
    precio_nafta_por_litro: float
    trafico_Moderado: int = 0
    trafico_Pesado: int = 0
    auto_modelo_Toyota_Etios: int = 0
    auto_modelo_VW_Gol: int = 0
    tipo_trayecto_Urbano: int = 0
    

@app.get('/')
def read_root():
    return {'mensaje': "Aqui la API consumo de nafta"}

@app.post('/predict')
def predict(data:PrediccionInput):
    input_data = np.array([[ 
    data.distancia_km,
    data.tiempo_min,
    data.precio_nafta_por_litro,
    data.trafico_Moderado,
    data.trafico_Pesado,
    data.auto_modelo_Toyota_Etios,
    data.auto_modelo_VW_Gol,
    data.tipo_trayecto_Urbano
    ]])
    
    pred = model.predict(input_data)
    
    return {"prediccion _litros": round(pred[0], 2)}

@app.get('/metrics')
def get_metrics():
    return {'score_R2': MODEL_SCORE}

