from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Inicialização padrão exigida pela Vercel
app = FastAPI(title="Velox Solar API", version="1.0.0")

# Configuração de CORS para permitir que o Front-end converse com o Back-end em qualquer ambiente
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo estrito de dados que o seu Front-end envia pelo formulário
class SimulacaoRequest(BaseModel):
    nome: str
    telefone: str
    valor_fatura: float
    tipo_imovel: str

# Rota principal que bate com o fetch('/api/simular') do seu page.js
@app.post("/api/simular")
async def processar_simulacao(dados: SimulacaoRequest):
    try:
        fatura = dados.valor_fatura
        tipo = dados.tipo_imovel
        
        # Lógica de engenharia baseada no material da Velox Solar
        # Descontando a taxa de disponibilidade (Custo de disponibilidade médio)
        taxa_disponibilidade = 50.0 if tipo == "Residencial" else 150.0
        consumo_util = max(0.0, fatura - taxa_disponibilidade)
        
        # Estimativa média de 85% de redução real
        economia_mensal = consumo_util * 0.85
        economia_anual = economia_mensal * 12
        
        # Cálculo de Payback estimado em 5 anos (60 meses) de mercado
        nova_fatura_estimada = fatura - economia_mensal
        investimento_aproximado = economia_mensal * 60

        # Texto customizado em primeira pessoa para o WhatsApp comercial
        mensagem_whats = (
            f"Olá, sou {dados.nome}. Fiz uma simulação na Velox Solar que deu uma "
            f"economia anual estimada de R$ {round(economia_anual, 2)}. Gostaria de saber mais sobre o projeto!"
        )

        # Retorno idêntico ao que as variáveis do seu page.js estão esperando ler
        return {
          "cliente": dados.nome,
          "fatura_original": f"{round(fatura, 2)}",
          "nova_fatura_estimada": f"{round(nova_fatura_estimada, 2)}",
          "economia_mensal": f"{round(economia_mensal, 2)}",
          "economia_anual": f"{round(economia_anual, 2)}",
          "payback_anos": "5",
          "investimento_approx": f"{round(investimento_aproximado, 2)}",
          "mensagem_whatsapp": mensagem_whats
        }

    except Exception as e:
        # Se acontecer qualquer erro de matemática ou nulo, o servidor avisa explicitamente
        raise HTTPException(status_code=500, detail=f"Erro interno no cálculo: {str(e)}")
    
    