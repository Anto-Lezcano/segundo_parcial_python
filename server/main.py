from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# carga de archivos pkl
model = joblib.load('./model/modelo_consumo_nafta.pkl')
features = joblib.load('./model/features.pkl')

app = FastAPI(title='Consumo de Nafta')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_SCORE = joblib.load('./model/metrics.pkl')

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
    
    return {"prediccion_litros": round(pred[0], 2)}

@app.get('/metrics')
def get_metrics():
    return {'score_R2': MODEL_SCORE}

