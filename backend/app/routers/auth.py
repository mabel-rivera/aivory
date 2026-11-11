
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from ..database import get_db
from ..models.users import Medico
from ..schemas.user import MedicoRegistro, MedicoRespuesta
from ..core.security import hash_password

from ..schemas.auth import InicioSesion, TokenRespuesta
from ..core.security import verify_password, create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"]
)


@router.post(
    "/register",
    response_model=MedicoRespuesta,
    status_code=status.HTTP_201_CREATED
)
def registrar_medico(
    datos: MedicoRegistro,
    db: Session = Depends(get_db)
):
    # Verificar si el correo ya está registrado
    correo = str(datos.correo).lower()

    medico_existente = db.scalar(
        select(Medico).where(Medico.correo == correo)
    )

    if medico_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este correo electrónico ya está registrado"
        )

    # Crear el nuevo médico
    nuevo_medico = Medico(
        nombres=datos.nombres.strip(),
        apellidos=datos.apellidos.strip(),
        telefono=datos.telefono.strip(),
        correo=correo,
        contrasena_hash=hash_password(datos.contrasena)
    )

    try:
        db.add(nuevo_medico)
        db.commit()
        db.refresh(nuevo_medico)

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="No fue posible registrar el médico. Verifica que el correo no esté registrado."
        )
        
    
@router.post("/login", response_model=TokenRespuesta)
def iniciar_sesion(
    datos: InicioSesion,
    db: Session = Depends(get_db)
):
    # Buscar al médico por su correo
    correo = str(datos.correo).lower()

    medico = db.scalar(
        select(Medico).where(Medico.correo == correo)
    )

    # Verificar que el médico exista y que la contraseña sea correcta
    if not medico or not verify_password(
        datos.contrasena,
        medico.contrasena_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Correo electrónico o contraseña incorrectos"
        )

    # Generar token JWT
    access_token = create_access_token(
        data={
            "sub": str(medico.id_medico),
            "correo": medico.correo
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "mensaje": "Inicio de sesión exitoso"
    }

        
        

    return nuevo_medico
