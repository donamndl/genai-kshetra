from fastapi import APIRouter
from pydantic import BaseModel
from chains import get_general_chain

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    language: str = "en"

@router.post("/ask")
async def ask_general(request: QueryRequest):
    chain = get_general_chain()
    response = chain.invoke({
        "query": request.query,
        "language": request.language
    })
    return {"response": response}