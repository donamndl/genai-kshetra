from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from chains import get_general_chain
import asyncio

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

@router.post("/ask/stream")
async def ask_general_stream(request: QueryRequest):
    async def generate():
        chain = get_general_chain()
        # Assuming chain.stream returns an async generator
        async for chunk in chain.stream({
            "query": request.query,
            "language": request.language
        }):
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0.1)  # Simulate delay for typing effect
    return StreamingResponse(generate(), media_type="text/event-stream")