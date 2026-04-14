from fastapi import APIRouter
from pydantic import BaseModel
from chains import get_medical_chain

router = APIRouter()

class MedRequest(BaseModel):
    query: str
    region: str = "Odisha"
    language: str = "en"

@router.post("/ask")
async def ask_medical(request: MedRequest):
    chain = get_medical_chain()
    response = chain.invoke({
        "query": request.query,
        "region": request.region,
        "language": request.language
    })
    return {"response": response}