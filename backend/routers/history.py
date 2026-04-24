from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from .auth import get_current_user
from db import db

router = APIRouter()

class HistoryPayload(BaseModel):
    messages: list


@router.get('/{module_key}')
def load_history(module_key: str, current_user: dict = Depends(get_current_user)):
    history = db.histories.find_one({'email': current_user['email'], 'module_key': module_key})
    return {'messages': history['messages'] if history else []}


@router.post('/{module_key}')
def save_history(module_key: str, payload: HistoryPayload, current_user: dict = Depends(get_current_user)):
    db.histories.update_one(
        {'email': current_user['email'], 'module_key': module_key},
        {'$set': {'messages': payload.messages, 'updatedAt': datetime.utcnow()}},
        upsert=True,
    )
    return {'success': True}


@router.delete('/{module_key}')
def clear_history(module_key: str, current_user: dict = Depends(get_current_user)):
    db.histories.delete_one({'email': current_user['email'], 'module_key': module_key})
    return {'success': True}
