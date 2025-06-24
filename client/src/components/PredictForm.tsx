import React, { useState } from "react";
import { predictNafta } from "../api/predict";
import type { PredictInput } from "../api/predict";
import { motion } from "framer-motion";

export default function PredictForm() {
  const [formData, setFormData] = useState<PredictInput>({
    distancia_km: 0,
    tiempo_min: 0,
    precio_nafta_por_litro: 0,
    trafico_Moderado: 0,
    trafico_Pesado: 0,
    auto_modelo_Toyota_Etios: 0,
    auto_modelo_VW_Gol: 0,
    tipo_trayecto_Urbano: 0,
  });
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      formData.distancia_km <= 0 ||
      formData.tiempo_min <= 0 ||
      formData.precio_nafta_por_litro <= 0
    ) {
      setError("Por favor completa todos los campos correctamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await predictNafta(formData);
      setResultado(res.prediccion_litros);
    } catch (err) {
      setError("Error en la predicción. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rounded-2xl overflow-hidden p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Predicción de Consumo
        </h2>
        <p className="text-gray-600">
          Calcula el consumo estimado de nafta para tu viaje
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distancia (km)
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <input
                type="number"
                name="distancia_km"
                value={formData.distancia_km}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                min="1"
              />
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiempo (minutos)
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <input
                type="number"
                name="tiempo_min"
                value={formData.tiempo_min}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                min="1"
              />
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio por litro ($)
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <input
                type="number"
                name="precio_nafta_por_litro"
                value={formData.precio_nafta_por_litro}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                min="1"
              />
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tráfico
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={(e) => {
                  const trafico = e.target.value;
                  setFormData({
                    ...formData,
                    trafico_Moderado: trafico === "Moderado" ? 1 : 0,
                    trafico_Pesado: trafico === "Pesado" ? 1 : 0,
                  });
                }}
              >
                <option value="Moderado">Moderado</option>
                <option value="Pesado">Pesado</option>
                <option value="Leve">Leve</option>
              </select>
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo de Auto
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={(e) => {
                  const auto = e.target.value;
                  setFormData({
                    ...formData,
                    auto_modelo_Toyota_Etios: auto === "Toyota" ? 1 : 0,
                    auto_modelo_VW_Gol: auto === "VW" ? 1 : 0,
                  });
                }}
              >
                <option value="Toyota">Toyota Etios</option>
                <option value="VW">VW Gol</option>
                <option value="Fiat">Fiat Cronos</option>
              </select>
            </motion.div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Trayecto
            </label>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={(e) => {
                  const trayecto = e.target.value;
                  setFormData({
                    ...formData,
                    tipo_trayecto_Urbano: trayecto === "Urbano" ? 1 : 0,
                  });
                }}
              >
                <option value="Urbano">Urbano</option>
                <option value="Ruta">Ruta</option>
              </select>
            </motion.div>
          </div>
        </div>

        <motion.button
          type="submit"
          className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-lg transition ${
            isSubmitting
              ? "bg-blue-400"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Calculando...
            </div>
          ) : (
            <span>Calcular Consumo</span>
          )}
        </motion.button>
      </form>

      {resultado !== null && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-inner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Resultado</h3>
              <div className="mt-1 text-lg font-semibold text-green-700">
                Consumo estimado:{" "}
                <span className="text-2xl text-green-900">
                  {resultado.toFixed(2)}
                </span>{" "}
                litros
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-inner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
