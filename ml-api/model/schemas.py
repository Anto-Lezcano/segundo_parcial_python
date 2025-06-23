from pydantic import BaseModel

class Prediction(BaseModel):
    distancia_km: float
    tiempo_min: int
    trafico: str
    auto_modelo: str
    tipo_trayecto: str
    
    
class PredictionOutput(BaseModel):
    combustible_predicho: float
    metricas: dict