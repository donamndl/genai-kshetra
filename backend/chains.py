import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def get_llm():
    return ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.4,
        groq_api_key=os.getenv("GROQ_API_KEY")
    )

def get_general_chain():
    prompt = ChatPromptTemplate.from_template("""
You are Kshetra, a helpful AI assistant for Indian citizens.
Answer the following question in {language} language.
Be concise, friendly, and use simple words.
If the language is Hindi or Odia, respond in that script.

Question: {query}
""")
    return prompt | get_llm() | StrOutputParser()

def get_agriculture_chain():
    prompt = ChatPromptTemplate.from_template("""
You are an agricultural expert assistant for farmers in {region}, India.
Answer in {language} language using simple, practical terms.
Focus on local farming practices, crops common to {region}, and seasonal advice.
If asked about weather or soil, give region-specific guidance.

Farmer's question: {query}
""")
    return prompt | get_llm() | StrOutputParser()

def get_education_chain():
    prompt = ChatPromptTemplate.from_template("""
You are an education assistant for students in India.
Answer in {language} language using very simple words and local examples.
If explaining a concept, use everyday Indian examples.
Also mention any relevant government scholarships if applicable.

Student's question: {query}
""")
    return prompt | get_llm() | StrOutputParser()

def get_medical_chain():
    prompt = ChatPromptTemplate.from_template("""
You are a helpful medical information assistant for citizens in {region}, India.
Answer in {language} language.
Give general health information only — always recommend consulting a doctor.
Mention nearby health services in {region} if relevant.
Include vaccination or outbreak alerts if applicable.

Health question: {query}
""")
    return prompt | get_llm() | StrOutputParser()