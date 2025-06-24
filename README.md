# 🚗 Predicción de Consumo de Nafta

Sistema inteligente para predecir el consumo de combustible en trayectos utilizando Machine Learning. Desarrollado como proyecto final para el Segundo Parcial de Python.

## 📋 Descripción

Este proyecto implementa un sistema completo de predicción de consumo de nafta que combina:

- **Backend robusto** con FastAPI para el procesamiento de datos y predicciones
- **Frontend moderno** con React, TypeScript y animaciones fluidas
- **Modelo de ML** entrenado con scikit-learn para predicciones precisas
- **Interfaz intuitiva** con diseño responsive y experiencia de usuario optimizada

## 🏗️ Arquitectura del Proyecto

```
SEGUNDO_PARCIAL_PYTHON/
├── 📁 client/                    # Frontend React + TypeScript
│   ├── 📁 src/
│   │   ├── 📁 components/        # Componentes React
│   │   ├── 📁 types/            # Definiciones TypeScript
│   │   └── 📄 App.tsx           # Componente principal
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   └── 📄 tailwind.config.js
├── 📁 server/                    # Backend FastAPI
│   ├── 📄 main.py               # Servidor principal
│   ├── 📁 model/                # Modelos entrenados
│   │   ├── 📄 modelo_consumo_nafta.pkl
│   │   ├── 📄 features.pkl
│   │   └── 📄 metrics.pkl
│   └── 📄 requirements.txt
├── 📁 train/                     # Datos y entrenamiento
│   ├── 📁 model/
│   │   └── 📄 consumo_nafta.csv  # Dataset
│   └── 📄 entrenamiento.ipynb   # Jupyter Notebook
└── 📄 README.md
```

## 🚀 Tecnologías Utilizadas

### Backend

- **FastAPI** - Framework web moderno y rápido
- **scikit-learn** - Biblioteca de Machine Learning
- **joblib** - Serialización de modelos
- **numpy** - Computación numérica
- **uvicorn** - Servidor ASGI

### Frontend

- **React 18** - Biblioteca de interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **TailwindCSS** - Framework de estilos utilitarios
- **Framer Motion** - Animaciones fluidas

### Machine Learning

- **Regresión Lineal** - Algoritmo de predicción
- **Validación cruzada** - Evaluación del modelo
- **Métricas R²** - Medición de precisión

## 📋 Requisitos del Sistema

- **Python 3.9+**
- **Node.js 16+**
- **npm 8+**

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd SEGUNDO_PARCIAL_PYTHON
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias de Python
pip install fastapi uvicorn scikit-learn joblib numpy pandas

# O usando requirements.txt (si existe)
pip install -r requirements.txt
```

### 3. Configurar el Frontend

```bash
# Navegar al directorio del cliente
cd ../client

# Instalar dependencias de Node.js
npm install
```

## 🚀 Uso

### Iniciar el Backend

```bash
cd server
uvicorn main:app --reload --port 8000
```

El servidor estará disponible en: `http://127.0.0.1:8000`

**Documentación API**: `http://127.0.0.1:8000/docs`

### Iniciar el Frontend

```bash
cd client
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## 🧪 Cómo Usar la Aplicación

1. **Completar el formulario** con los siguientes datos:

   - 📏 Distancia del trayecto (km)
   - ⏱️ Tiempo estimado (minutos)
   - 💰 Precio actual del combustible
   - 🚦 Tipo de tráfico (Liviano/Moderado/Pesado)
   - 🚗 Tipo de vehículo
   - 🛣️ Tipo de trayecto (Urbano/Ruta/Mixto)

2. **Hacer clic en "Calcular Consumo"**

3. **Ver el resultado** en el panel de predicción

4. **Consultar métricas** del modelo en tiempo real

## 📊 Características del Modelo

- **Algoritmo**: Regresión Lineal
- **Variables predictoras**: Distancia, tiempo, precio, tipo de tráfico, vehículo y trayecto
- **Métrica de evaluación**: Coeficiente de determinación (R²)
- **Validación**: Validación cruzada k-fold

## 🔧 Scripts Disponibles

### Backend

```bash
# Iniciar servidor de desarrollo
uvicorn main:app --reload --port 8000

# Iniciar servidor de producción
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
# Servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar construcción
npm run preview

# Linting
npm run lint
```

## 🧪 Testing

```bash
# Backend (si hay tests)
cd server
python -m pytest

# Frontend
cd client
npm run test
```

## 📝 API Endpoints

- `POST /predict` - Realizar predicción de consumo
- `GET /metrics` - Obtener métricas del modelo

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
