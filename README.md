# 🧠 Nexus AI: Knowledge-Base Intelligence Platform

[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/UI-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![LangChain](https://img.shields.io/badge/Orchestration-LangChain-white?style=for-the-badge&logo=chainlink)](https://python.langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Nexus AI is a sophisticated RAG (Retrieval-Augmented Generation) platform designed to transform static documents into interactive, context-aware intelligence.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Client
        A[React Frontend] -->|REST/Stream| B[FastAPI Gateway]
    end

    subgraph "AI Engine (LangChain)"
        B --> C{Orchestrator}
        C --> D[Embedding Model]
        C --> E[LLM - GPT-4/Ollama]
    end

    subgraph "Knowledge Layer"
        D --> F[(Vector Store)]
        F -->|Context| C
    end
---

## ✨ Core Pillars

- ⚡ Real-time RAG: Semantic search with low-latency context retrieval.
- 📁 Document Intelligence: Support for PDF, Markdown, and TXT ingestion.
- 💬 Conversational Memory: State-managed chat history for deep reasoning.
- 🔌 Model Agnostic: Easily toggle between OpenAI, Anthropic, or local LLMs.

---

## 🛠️ Rapid Deployment
### 1. Backend Orchestration
- cd backend
- python -m venv venv
- source venv/bin/activate  # Windows: venv\Scripts\activate
- pip install -r requirements.txt
- cp .env.example .env
-python main.py

### 2. Frontend Interface

- cd frontend
- npm install
- npm run dev

### ⚙️ Environment Configuration
- Variable	Description	Default
- OPENAI_API_KEY	Your AI Provider Key	Required
- VECTOR_DB_TYPE	Type of store (Chroma/Pinecone)	chroma
- CHUNK_SIZE	Size of text splits	1000
- VITE_API_URL	Backend Endpoint	http://localhost:8000

---

## 🚀 Roadmap

- Support for Multi-modal inputs (Images/Vision)
- Integration with Slack/Discord bots
- Advanced User Authentication & Projects
- Multi-Vector indexing for complex tables


---

### Why this is the "Better" way:

1.  **Visual Representation:** The Mermaid diagram in the README explains your project instantly without the user reading a single word of text.
2.  **Environment Table:** Including a table of variables makes it much easier for others to debug and set up your project.
3.  **Glob Patterns in Gitignore:** By using `**/`, you ensure that even if you create a `testing/` folder or a `temp/` folder later, those sub-folders will also be correctly ignored.
4.  **Badges:** They give the project immediate visual credibility (standard for high-quality open-source projects).
5.  **Separation of Concerns:** It clearly distinguishes between the "Client," "AI Engine," and "Knowledge Layer."

### Pro Tip for VS Code:
After creating these, if you still see a bunch of green "U" markers on files that should be ignored, run this in your terminal:
`git rm -r --cached . && git add .` 
This forces Git to re-scan your project using the new `.gitignore` rules.