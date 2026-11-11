
from pydantic import BaseModel, EmailStr


class InicioSesion(BaseModel):
    correo: EmailStr
    contrasena: str


class TokenRespuesta(BaseModel):
    access_token: str
    token_type: str
    mensaje: str
