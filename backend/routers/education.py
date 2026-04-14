from fastapi import APIRouter
from pydantic import BaseModel
from chains import get_education_chain

router = APIRouter()

class EduRequest(BaseModel):
    query: str
    language: str = "en"

@router.post("/ask")
async def ask_education(request: EduRequest):
    chain = get_education_chain()
    response = chain.invoke({
        "query": request.query,
        "language": request.language
    })
    return {"response": response}