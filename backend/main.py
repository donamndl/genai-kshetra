from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import agriculture, education, medical, general, auth, history

load_dotenv()

app = FastAPI(title="Kshetra - India's Knowledge, Reimagined Through AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agriculture.router, prefix="/agriculture", tags=["Agriculture"])
app.include_router(education.router,   prefix="/education",   tags=["Education"])
app.include_router(medical.router,     prefix="/medical",     tags=["Medical"])
app.include_router(general.router,     prefix="/general",     tags=["General"])
app.include_router(auth.router,        prefix="/auth",        tags=["Auth"])
app.include_router(history.router,     prefix="/history",     tags=["History"])

@app.get("/")
def root():
    return {"message": "Kshetra API is running 🌿"}