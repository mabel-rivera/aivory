
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict, model_validator


class MedicoRegistro(BaseModel):
    nombres: str = Field(min_length=2, max_length=100)
    apellidos: str = Field(min_length=2, max_length=100)
    telefono: str = Field(min_length=7, max_length=20)
    correo: EmailStr
    contrasena: str = Field(min_length=8, max_length=128)
    confirmar_contrasena: str = Field(min_length=8, max_length=128)

    @model_validator(mode="after")
    def validar_contrasenas(self):
        if self.contrasena != self.confirmar_contrasena:
            raise ValueError("Las contraseñas no coinciden")

        return self


class MedicoRespuesta(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_medico: int
    nombres: str
    apellidos: str
    telefono: str
    correo: str
    fecha_creacion: datetime
