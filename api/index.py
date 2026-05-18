from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Garanta que a variável se chama exatamente 'app' e está colada na parede esquerda do arquivo
app = FastAPI(title="Velox Solar API", version="1.0.0")

# Se você tiver configurações de CORS, garanta que usam a variável app:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definição do modelo de dados recebido do front-end
class SimulacaoRequest(BaseModel):
    nome: str
    telefone: str
    valor_fatura: float
    tipo_imovel: str