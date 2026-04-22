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