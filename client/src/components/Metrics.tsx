import { useEffect, useState } from "react";
import { getMetrics } from "../api/predict";
import { motion } from "framer-motion";

export default function Metrics() {
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const res = await getMetrics();
      console.log("Métricas recibidas:", res);
      setScore(res.score_R2);
    } catch {
      setScore(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl rounded-2xl overflow-hidden p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-center mb-6"
      >
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 11V9a4 4 0 118 0v2m-4 4a4 4 0 100-8 4 4 0 000 8zm-7 4v-6h.01M5 20h14"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📊 Métricas del Modelo
        </h2>
        {score !== null ? (
          <p className="text-center text-lg text-purple-700">
            Precisión R²: <strong>{score.toFixed(2)}</strong>
          </p>
        ) : (
          <p className="text-center text-gray-400 text-sm">
            Métrica no cargada
          </p>
        )}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={fetchMetrics}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
          isLoading
            ? "bg-purple-400"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        }`}
      >
        {isLoading ? "Actualizando..." : "Refrescar Métricas"}
      </motion.button>
    </motion.div>
  );
}
