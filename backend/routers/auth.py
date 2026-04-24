from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from dotenv import load_dotenv
import jwt
import os

from db import db

load_dotenv()

SECRET_KEY = os.getenv('JWT_SECRET', 'supersecretkey')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
pwd_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')
router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class UserResponse(BaseModel):
    name: str
    email: str


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_user(email: str):
    return db.users.find_one({'email': email})


def get_current_user(request: Request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Missing or invalid authorization header')
    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get('sub')
        if not email:
            raise HTTPException(status_code=401, detail='Invalid token payload')
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='Invalid or expired token')

    user = get_user(email)
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user


@router.post('/signup', response_model=dict)
def signup(request: SignupRequest):
    existing = get_user(request.email)
    if existing:
        raise HTTPException(status_code=400, detail='Email already registered.')

    hashed_password = get_password_hash(request.password)
    new_user = {
        'name': request.name,
        'email': request.email,
        'password': hashed_password,
        'createdAt': datetime.utcnow(),
    }
    db.users.insert_one(new_user)
    access_token = create_access_token({'sub': request.email})
    return {
        'user': {'name': request.name, 'email': request.email},
        'access_token': access_token,
        'token_type': 'bearer',
    }


@router.post('/login', response_model=dict)
def login(request: LoginRequest):
    user = get_user(request.email)
    if not user or not verify_password(request.password, user['password']):
        raise HTTPException(status_code=401, detail='Invalid email or password.')

    access_token = create_access_token({'sub': request.email})
    return {
        'user': {'name': user['name'], 'email': user['email']},
        'access_token': access_token,
        'token_type': 'bearer',
    }


@router.get('/me', response_model=dict)
def me(current_user: dict = Depends(get_current_user)):
    return {'user': {'name': current_user['name'], 'email': current_user['email']}}
