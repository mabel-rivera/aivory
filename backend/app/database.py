
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Obtener la dirección de conexión desde las variables de entorno
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("No se encontró la variable DATABASE_URL")

# Crear el motor de conexión con PostgreSQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Crear sesiones para realizar operaciones en la base de datos
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Clase base para los modelos de la base de datos
class Base(DeclarativeBase):
    pass

# Dependencia para obtener y cerrar sesiones
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
