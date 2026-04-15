# 🤖 GenAI Knowledge Platform

> A production-ready RAG (Retrieval-Augmented Generation) platform to chat with your custom data.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![LangChain](https://img.shields.io/badge/Orchestration-LangChain-121212?style=flat-square)](https://langchain.com/)

---

## 🏗️ Architecture
The platform follows a classic decoupled architecture optimized for AI workloads:

1.  **Frontend (Vite/React):** Modern UI with streaming response support.
2.  **Backend (FastAPI):** High-performance Python API handling LLM orchestration via LangChain.
3.  **Knowledge Base:** Local Vector DB (ChromaDB/FAISS) for semantic search.

```text
User ⮕ React UI ⮕ FastAPI ⮕ LangChain ⮕ Vector DB / LLM