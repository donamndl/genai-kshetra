from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from dotenv import load_dotenv
import jwt
import os
import secrets

from db import db

load_dotenv()

SECRET_KEY = os.getenv('JWT_SECRET', 'supersecretkey')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
RESET_CODE_EXPIRY_MINUTES = 30

pwd_context = CryptContext(schemes=['pbkdf2_sha256'], deprecated='auto')
router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    password: str

class LoginRequest(BaseModel):
    identifier: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str
    new_password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class UserResponse(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_user_by_email(email: str):
    if not email:
        return None
    return db.users.find_one({'email': email})


def get_user_by_mobile(mobile: str):
    if not mobile:
        return None
    return db.users.find_one({'mobile': mobile})


def find_user(identifier: str):
    if not identifier:
        return None
    return db.users.find_one({'$or': [{'email': identifier}, {'mobile': identifier}]})


def get_current_user(request: Request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Missing or invalid authorization header')
    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        identifier = payload.get('sub')
        if not identifier:
            raise HTTPException(status_code=401, detail='Invalid token payload')
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='Invalid or expired token')

    user = find_user(identifier)
    if not user:
        raise HTTPException(status_code=401, detail='User not found')
    return user


def generate_reset_code() -> str:
    return ''.join(secrets.choice('0123456789') for _ in range(6))




@router.post('/signup', response_model=dict)
def signup(request: SignupRequest):
    if not request.email and not request.mobile:
        raise HTTPException(status_code=400, detail='Email or mobile number is required.')

    if request.email and get_user_by_email(request.email):
        raise HTTPException(status_code=400, detail='Email already registered.')

    if request.mobile and get_user_by_mobile(request.mobile):
        raise HTTPException(status_code=400, detail='Mobile number already registered.')

    hashed_password = get_password_hash(request.password)
    new_user = {
        'name': request.name,
        'email': request.email,
        'mobile': request.mobile,
        'password': hashed_password,
        'createdAt': datetime.utcnow(),
    }
    db.users.insert_one(new_user)
    access_token = create_access_token({'sub': request.email or request.mobile})
    return {
        'user': {
            'name': request.name,
            'email': request.email,
            'mobile': request.mobile,
        },
        'access_token': access_token,
        'token_type': 'bearer',
    }


@router.post('/login', response_model=dict)
def login(request: LoginRequest):
    user = find_user(request.identifier)
    if not user or not verify_password(request.password, user['password']):
        raise HTTPException(status_code=401, detail='Invalid email/mobile or password.')

    access_token = create_access_token({'sub': user.get('email') or user.get('mobile')})
    return {
        'user': {
            'name': user['name'],
            'email': user.get('email'),
            'mobile': user.get('mobile'),
        },
        'access_token': access_token,
        'token_type': 'bearer',
    }


@router.post('/forgot-password', response_model=dict)
def forgot_password(request: ForgotPasswordRequest):
    user = get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail='Email not registered.')

    reset_code = generate_reset_code()
    expires_at = datetime.utcnow() + timedelta(minutes=RESET_CODE_EXPIRY_MINUTES)
    db.users.update_one(
        {'_id': user['_id']},
        {'$set': {'reset_code': reset_code, 'reset_code_expires_at': expires_at}},
    )

    return {
        'message': 'Verification code generated. Use this code to reset your password.',
        'reset_code': reset_code,
    }


@router.post('/reset-password', response_model=dict)
def reset_password(request: ResetPasswordRequest):
    user = get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail='Email not registered.')

    stored_code = user.get('reset_code')
    expires_at = user.get('reset_code_expires_at')
    if not stored_code or request.code != stored_code:
        raise HTTPException(status_code=400, detail='Invalid verification code.')
    if not expires_at or datetime.utcnow() > expires_at:
        raise HTTPException(status_code=400, detail='Verification code expired.')

    hashed_password = get_password_hash(request.new_password)
    db.users.update_one(
        {'_id': user['_id']},
        {'$set': {'password': hashed_password}, '$unset': {'reset_code': '', 'reset_code_expires_at': ''}},
    )
    return {'message': 'Password reset successfully. You can now sign in with your new password.'}


@router.get('/me', response_model=dict)
def me(current_user: dict = Depends(get_current_user)):
    return {
        'user': {
            'name': current_user['name'],
            'email': current_user.get('email'),
            'mobile': current_user.get('mobile'),
        }
    }
