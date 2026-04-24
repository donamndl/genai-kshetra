from dotenv import load_dotenv
from pymongo import MongoClient
import os

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017')
MONGODB_DB = os.getenv('MONGODB_DB', 'kshetra')

client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
db = client[MONGODB_DB]
