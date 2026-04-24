# 🧠 GenAI Knowledge Platform

A full-stack RAG (Retrieval-Augmented Generation) application designed to turn your private documents into an interactive knowledge base using LLMs.

---

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, LangChain
- **Frontend:** React, Vite, TailwindCSS
- **Embeddings:** OpenAI / HuggingFace
- **Vector DB:** ChromaDB / FAISS

---

## 🏗️ System Overview

The platform operates in three simple layers:

1. **The Interface (Frontend):** A React-based chat UI that handles user queries and displays real-time streaming AI responses.
2. **The Logic (Backend):** A FastAPI server that manages document ingestion, text splitting, and AI chain orchestration.
3. **The Brain (AI Layer):** LangChain manages the connection between the vector database (your knowledge) and the Large Language Model (the reasoning).

---

## ✨ Features

- **Document Ingestion:** Upload and process PDFs, Text, and Markdown.
- **Semantic Retrieval:** Uses vector embeddings to find the most relevant context for every query.
- **Streaming UI:** Tokens are streamed to the UI in real-time for a smooth user experience.
- **Context Management:** Persistent chat history for follow-up questions.

---

## 🚀 Getting Started

### 1. Backend Setup

cd backend
python -m venv venv
# Activate venv:
# Source venv/bin/activate (Linux/Mac) or venv\Scripts\activate (Windows)
pip install -r requirements.txt
# Create your .env file in the backend folder
python main.py

### 2. Frontend Setup

cd frontend
npm install
# Create your .env file in the frontend folder
npm run dev

---

## ⚙️ Environment Configuration
Variable	     Location	     Description
OPENAI_API_KEY	 Backend .env	 Required for LLM and Embeddings
DATABASE_URL	 Backend .env	 Connection string for your vector store
VITE_API_URL	 Frontend .env	 Usually http://localhost:8000

---

## 📁 Project Structure

- /backend: FastAPI application, LangChain logic, and vector storage.
- /frontend: React source code, components, and assets.
- .gitignore: Global rules for the entire repository.
- README.md: Project documentation.