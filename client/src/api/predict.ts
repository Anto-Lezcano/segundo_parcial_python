const API_URL = "http://127.0.0.1:8000";

export interface PredictInput {
  distancia_km: number;
  tiempo_min: number;
  precio_nafta_por_litro: number;
  trafico_Moderado: number;
  trafico_Pesado: number;
  auto_modelo_Toyota_Etios: number;
  auto_modelo_VW_Gol: number;
  tipo_trayecto_Urbano: number;
}

export async function predictNafta(data: PredictInput) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en la predicción");
  }

  return await response.json();
}

export async function getMetrics() {
  const response = await fetch(`${API_URL}/metrics`);

  if (!response.ok) {
    throw new Error("Error al obtener métricas");
  }

  return await response.json();
}
