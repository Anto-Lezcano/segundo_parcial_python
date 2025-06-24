import PredictForm from "./components/PredictForm";
import Metrics from "./components/Metrics";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
        🚗 Predicción de Consumo de Nafta
      </h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-6xl">
        <PredictForm />
        <Metrics />
      </div>
    </div>
  );
}

export default App;
