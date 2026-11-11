from fastapi import FastAPI, HTTPException
from sqlalchemy import text
from .database import engine
from .routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Aivory API",
    description="Backend de la plataforma de gestión clínica veterinaria",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rutas de autenticación
app.include_router(auth_router)

@app.get("/")
def inicio():
    return {
        "mensaje": "Bienvenido al backend de Aivory"
    }


@app.get("/estado")
def estado():
    return {
        "estado": "Funcionando correctamente"
    }
    
@app.get("/db-check")
def comprobar_conexion():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "base_de_datos": "Conexión exitosa",
            "mensaje": "FastAPI se comunica correctamente con PostgreSQL"
        }

    except Exception:
        raise HTTPException(
            status_code=503,
            detail="No fue posible conectar con PostgreSQL"
        )