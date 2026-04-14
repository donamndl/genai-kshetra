from fastapi import APIRouter
from pydantic import BaseModel
from chains import get_agriculture_chain

router = APIRouter()

class AgriRequest(BaseModel):
    query: str
    region: str = "Odisha"
    language: str = "en"

@router.post("/ask")
async def ask_agriculture(request: AgriRequest):
    chain = get_agriculture_chain()
    response = chain.invoke({
        "query": request.query,
        "region": request.region,
        "language": request.language
    })
    return {"response": response}