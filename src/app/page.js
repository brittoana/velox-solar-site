'use client';
import { useState } from 'react';

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState('home');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    fatura: 500,
    tipoImovel: 'Residencial'
  });
  
  const [resultadoSimulacao, setResultadoSimulacao] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🛠️ CORREÇÃO: Função unificada e limpa para evitar loops de requisição
  const calcularEconomia = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setResultadoSimulacao(null);
    
    try {
      // 🔄 Rota relativa padrão para microsserviços monorepo na Vercel
      const response = await fetch('/api/simular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          telefone: formData.telefone,
          valor_fatura: parseFloat(formData.fatura),
          tipo_imovel: formData.tipoImovel
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultadoSimulacao(data);
      } else {
        const erroTexto = await response.text();
        console.error("Erro retornado pelo servidor Python:", erroTexto);
        alert("O servidor Python respondeu com um erro ao processar os cálculos.");
      }
    } catch (error) {
      console.error("Erro na requisição de rede:", error);
      alert("Não foi possível conectar ao back-end. Certifique-se de que a API Python terminou de compilar na Vercel!");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b111e] bg-gradient-to-br from-[#0b111e] via-[#121b2d] to-[#070b14] text-white font-sans flex flex-col justify-between selection:bg-[#7fcc5e] selection:text-[#182236] relative overflow-x-hidden">
      
      {/* 🔮 ELEMENTOS DE ILUMINAÇÃO DE FUNDO */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7fcc5e]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      {/* 🟢 BOTÃO FLUTUANTE DO WHATSAPP */}
      <a 
        href="https://wa.me/5561995615570"
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366]/90 backdrop-blur-md text-white p-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center group border border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.596-1.008-5.036-2.846-6.876C16.592 2.147 14.155.989 11.564.989c-5.444 0-9.867 4.371-9.871 9.744-.002 1.81.474 3.578 1.38 5.148L2.082 21.6l6.052-1.588zM17.15 15.3c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-bold whitespace-nowrap text-white">
          Falar Conosco
        </span>
      </a>

      {/* HEADER EM ULTRA GLASSMORPHISM */}
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-4 z-50 bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 cursor-pointer group">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-500 group-hover:rotate-12">
            <circle cx="35" cy="50" r="18" fill="url(#gradient1)" />
            <circle cx="65" cy="38" r="12" fill="url(#gradient2)" />
            <circle cx="60" cy="68" r="10" fill="url(#gradient3)" />
            <defs>
              <linearGradient id="gradient1" x1="17" y1="32" x2="53" y2="68">
                <stop offset="0%" stopColor="#7fcc5e" />
                <stop offset="100%" stopColor="#69b549" />
              </linearGradient>
              <linearGradient id="gradient2" x1="53" y1="26" x2="77" y2="50">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="gradient3" x1="50" y1="58" x2="70" y2="78">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight leading-none text-white">VELOX</span>
            <span className="text-[#7fcc5e] font-bold text-[10px] tracking-[0.25em] leading-none mt-1">SOLAR</span>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-1.5 p-1 bg-black/30 border border-white/[0.05] rounded-xl backdrop-blur-md">
          {[
            { id: 'home', label: 'Home' },
            { id: 'quem-somos', label: 'Quem Somos' },
            { id: 'produtos', label: 'Produtos e Soluções' },
            { id: 'parceiros', label: 'Parceiros' },
            { id: 'faq', label: 'FAQ' }
          ].map((aba) => (
            <button
              key={aba.id}
              onClick={() => { setAbaAtiva(aba.id); if(aba.id !== 'home') setResultadoSimulacao(null); }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                abaAtiva === aba.id 
                  ? 'bg-[#7fcc5e]/15 text-[#7fcc5e] border border-[#7fcc5e]/30 shadow-[0_0_20px_rgba(127,204,94,0.2)] scale-105 font-bold' 
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {aba.label}
            </button>
          ))}
        </nav>
      </header>

      {/* CONTEÚDO DINÂMICO */}
      <div className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
        
        {abaAtiva === 'home' && (
          <main className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-[fadeIn_0.4s_ease-out]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7fcc5e] bg-[#7fcc5e]/10 px-4 py-1.5 rounded-full border border-[#7fcc5e]/20 shadow-[0_0_15px_rgba(127,204,94,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7fcc5e] animate-pulse"></span>
                Tecnologia e Engenharia de Ponta
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Zere a sua conta de luz com <span className="text-[#7fcc5e] drop-shadow-[0_0_25px_rgba(127,204,94,0.25)]">Alta Performance</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Reduza os custos energéticos do seu imóvel em até 95%. Projetamos, instalamos e homologamos usinas inteligentes com total segurança jurídica e técnica.
              </p>
              
              <div className="grid grid-cols-2 gap-6 max-w-md pt-2">
                <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.06] backdrop-blur-md shadow-lg">
                  <p className="text-3xl font-black text-[#7fcc5e] tracking-tight">+5.000</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-wide">Sistemas Instalados</p>
                </div>
                <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.06] backdrop-blur-md shadow-lg">
                  <p className="text-3xl font-black text-white tracking-tight">15 Anos</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-1 uppercase tracking-wide">De Experiência Técnica</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] w-full max-w-md border border-white/[0.08] relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7fcc5e] to-emerald-500"></div>
                
                {!resultadoSimulacao ? (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white tracking-tight">Simulador Inteligente</h3>
                      <p className="text-gray-400 text-xs mt-1">Calcule a sua redução de custos em segundos</p>
                    </div>

                    <form onSubmit={calcularEconomia} className="space-y-5">
                      <div>
                        <label className="block text-gray-300 text-xs font-bold mb-1.5 uppercase tracking-wider">Seu Nome</label>
                        <input type="text" name="nome" required placeholder="Digite o seu nome" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-black/30 text-white border border-white/[0.08] text-sm focus:outline-none focus:border-[#7fcc5e] focus:ring-1 focus:ring-[#7fcc5e]/30 transition-all" />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-xs font-bold mb-1.5 uppercase tracking-wider">WhatsApp</label>
                        <input type="tel" name="telefone" required placeholder="(00) 00000-0000" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-black/30 text-white border border-white/[0.08] text-sm focus:outline-none focus:border-[#7fcc5e] focus:ring-1 focus:ring-[#7fcc5e]/30 transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-xs font-bold mb-1.5 uppercase tracking-wider">Imóvel</label>
                          <select name="tipoImovel" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-black/30 text-white border border-white/[0.08] text-sm focus:outline-none focus:border-[#7fcc5e]">
                            <option value="Residencial">Residencial</option>
                            <option value="Comercial">Comercial</option>
                          </select>
                        </div>
                        <div className="flex flex-col justify-end items-end pb-1.5">
                          <span className="text-gray-400 text-xs">Conta Mensal</span>
                          <span className="text-[#7fcc5e] font-black text-xl">R$ {formData.fatura}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <input type="range" name="fatura" min="150" max="5000" step="50" value={formData.fatura} onChange={handleChange} className="w-full accent-[#7fcc5e] cursor-pointer h-2 bg-gray-800 rounded-lg appearance-none" />
                      </div>
                      <button type="submit" disabled={carregando} className="w-full py-4 bg-[#7fcc5e] hover:bg-[#6ec24a] text-[#182236] font-black rounded-xl transition-all duration-300 shadow-lg shadow-[#7fcc5e]/10 uppercase tracking-widest text-xs mt-2 disabled:opacity-50 hover:scale-[1.01]">
                        {carregando ? "Processando Cálculos..." : "Simular Economia Agora"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="animate-[fadeIn_0.5s_ease-out] space-y-5">
                    <div className="text-center border-b border-white/[0.08] pb-3">
                      <div className="text-3xl mb-1">🚀</div>
                      <h3 className="text-lg font-black text-[#7fcc5e] tracking-tight">Estudo Técnico Pronto!</h3>
                      <p className="text-gray-400 text-xs mt-0.5">Resultado aproximado gerado para {resultadoSimulacao.cliente}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/[0.04]">
                        <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Gasto Mensal Atual</span>
                        <span className="text-gray-300 font-bold">R$ {resultadoSimulacao.fatura_original}</span>
                      </div>

                      <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/[0.06] ring-1 ring-[#7fcc5e]/20">
                        <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Sua Nova Fatura Estimada</span>
                        <span className="text-[#7fcc5e] font-black text-lg">R$ {resultadoSimulacao.nova_fatura_estimada}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/20 p-3 rounded-xl border border-white/[0.04] text-center">
                          <span className="text-gray-400 text-[10px] uppercase tracking-wide block mb-0.5">Economia Mensal</span>
                          <span className="text-white font-extrabold text-base">R$ {resultadoSimulacao.economia_mensal}</span>
                        </div>
                        <div className="bg-gradient-to-b from-black/20 to-[#7fcc5e]/5 p-3 rounded-xl border-2 border-[#7fcc5e]/40 text-center shadow-[0_0_15px_rgba(127,204,94,0.1)]">
                          <span className="text-[#7fcc5e] text-[10px] uppercase tracking-wide block mb-0.5 font-black">Economia Anual</span>
                          <span className="text-[#7fcc5e] font-black text-lg">R$ {resultadoSimulacao.economia_anual}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/[0.04]">
                        <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Retorno do Sistema</span>
                        <span className="text-white font-bold">{resultadoSimulacao.payback_anos} Anos (Payback)</span>
                      </div>

                      <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/[0.04]">
                        <span className="text-gray-400 text-xs uppercase tracking-wide font-medium">Investimento Médio</span>
                        <span className="text-white font-bold">R$ {resultadoSimulacao.investimento_approx || resultadoSimulacao.investimento_aproximado}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 text-center italic leading-tight">
                      *Os valores acima são estimativas aproximadas regionais. O projeto final exige validação da nossa equipe de engenharia.
                    </p>

                    <div className="pt-2 space-y-2">
                      <a 
                        href={`https://wa.me/5561995615570?text=${encodeURIComponent(resultadoSimulacao.mensagem_whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black rounded-xl text-center transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-950/30 hover:scale-[1.02]"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.953 2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.596-1.008-5.036-2.846-6.876C16.592 2.147 14.155.989 11.564.989c-5.444 0-9.867 4.371-9.871 9.744-.002 1.81.474 3.578 1.38 5.148L2.082 21.6l6.052-1.588z"/></svg>
                        Falar com Especialista Técnico
                      </a>
                      
                      <button 
                        onClick={() => setResultadoSimulacao(null)}
                        className="w-full py-2.5 bg-transparent hover:bg-white/[0.04] text-gray-400 hover:text-gray-200 rounded-xl text-center transition-all text-xs font-bold border border-white/[0.06]"
                      >
                        🔄 Simular com Outro Valor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}

        {/* ================= SEÇÃO: QUEM SOMOS ================= */}
        {abaAtiva === 'quem-somos' && (
          <section className="max-w-4xl mx-auto space-y-10 animate-[fadeIn_0.4s_ease-out]">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/[0.02] p-8 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-md">
              <div className="space-y-4 flex-grow">
                <h2 className="text-3xl font-black text-white border-b pb-2 border-white/[0.08]">Quem Somos</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  A <strong>Velox Solar</strong> é uma empresa de engenharia e soluções em energia com <strong>15 anos de experiência</strong> de mercado. Atuamos com foco na transformação da matriz energética do país, convertendo custos operacionais em vantagens competitivas sustentáveis para empresas e residências.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Contamos com um <strong>departamento de engenharia próprio corporativo</strong>, encarregado de desenhar projetos sob medida com responsabilidade técnica integral (CREA) e conduzir o processo de homologação com agilidade regulatória.
                </p>
              </div>
              
              <div className="w-full md:w-80 bg-black/20 p-6 rounded-2xl border border-white/[0.06] text-center space-y-4">
                <div className="text-4xl text-[#7fcc5e]">🛠️</div>
                <h3 className="font-bold text-white">Equipe Técnica</h3>
                <p className="text-xs text-gray-400">Instalação executada por especialistas dedicados dentro das normas rígidas de segurança.</p>
              </div>
            </div>
          </section>
        )}

        {/* ================= SEÇÃO: PRODUTOS E SOLUÇÕES ================= */}
        {abaAtiva === 'produtos' && (
          <section className="space-y-12 animate-[fadeIn_0.4s_ease-out]">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-white">Nossas Soluções Energéticas</h2>
              <p className="text-gray-400 text-sm mt-2">Sistemas de alta engenharia estruturados com efeito glassmorphism interativo:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  img: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80", 
                  t: '⚡ Energia por Assinatura', 
                  d: 'Economia imediata na fatura de luz sem precisar instalar placas no seu telhado. Perfeito para apartamentos, imóveis alugados e pequenas empresas que querem energia limpa via créditos injetados na rede.' 
                },
                { 
                  img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80", 
                  t: '🏡 Residencial & Comercial', 
                  d: 'Desenvolvimento e fixação de painéis fotovoltaicos Tier 1 em telhados e coberturas para autogeração contínua e redução de custos em até 95%.' 
                },
                { 
                  // 🚜 CORREÇÃO: Link de imagem corrigido e limpo para o Agronegócio
                  img: "https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&w=600&q=80", 
                  t: '🚜 Agronegócios', 
                  d: 'Autonomia completa no campo com painéis dimensionados para bombardeamento solar, irrigação contínua e suporte integral ao produtor rural.' 
                },
                { 
                  img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80", 
                  t: '🔌 Mobilidade Elétrica', 
                  d: 'Infraestrutura avançada para instalação de eletropostos inteligentes e sistemas de carregamento rápido para frotas e condomínios.' 
                },
                { 
                  img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80", 
                  t: '🏭 Usinas de Grande Porte', 
                  d: 'Projetos complexos de solo de alta potência para indústrias e redes corporativas, garantindo alta previsibilidade operacional e um payback acelerado.' 
                },
                { 
                  img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80", 
                  t: '📊 Comercialização & Carbono', 
                  d: 'Consultoria estratégica para migração rumo ao Mercado Livre de Energia e assessoria para monetização através de Créditos de Carbono.' 
                }
              ].map((prod, idx) => (
                <div key={idx} className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-md hover:border-[#7fcc5e]/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl shadow-black/20">
                  <div className="h-48 w-full bg-black/40 relative overflow-hidden">
                    <img src={prod.img} alt={prod.t} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-75 group-hover:opacity-100" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-white text-lg group-hover:text-[#7fcc5e] transition-colors">{prod.t}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{prod.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SEÇÃO: PARCEIROS ================= */}
        {abaAtiva === 'parceiros' && (
          <section className="space-y-12 text-center animate-[fadeIn_0.4s_ease-out]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-white">Parcerias Tecnológicas Globais</h2>
              <p className="text-gray-400 text-sm mt-2">Nossos projetos são construídos exclusivamente com os maiores fabricantes Tier 1 mundiais:</p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto text-left">
              <div className="p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/[0.06]">
                <h3 className="text-sm font-bold text-[#7fcc5e] uppercase tracking-widest mb-4">☀️ Módulos e Painéis Fotovoltaicos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['JA SOLAR', 'Trinasolar', 'JinKo Solar', 'LONGI Solar', 'Canadian Solar'].map((b, i) => (
                    <div key={i} className="p-4 bg-black/20 border border-white/[0.04] text-center font-bold text-gray-300 text-sm rounded-xl hover:text-white hover:border-[#7fcc5e]/40 transition-colors">{b}</div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/[0.06]">
                <h3 className="text-sm font-bold text-[#38bdf8] uppercase tracking-widest mb-4">🎛️ Inversores e Monitoramento</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['HUAWEI', 'Fronius', 'Growatt', 'Solis Inverters', 'APsystems'].map((b, i) => (
                    <div key={i} className="p-4 bg-black/20 border border-white/[0.04] text-center font-bold text-gray-300 text-sm rounded-xl hover:text-white hover:border-[#38bdf8]/40 transition-colors">{b}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SEÇÃO: FAQ ================= */}
        {abaAtiva === 'faq' && (
          <section className="space-y-6 max-w-3xl mx-auto animate-[fadeIn_0.4s_ease-out]">
            <h2 className="text-3xl font-black text-white border-b pb-3 border-white/[0.08] mb-6">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                { q: 'Como funciona a Energia por Assinatura?', a: 'Você consome a energia gerada em nossas usinas parceiras de grande porte. Os créditos dessa produção são injetados diretamente na sua conta da distribuidora local, reduzindo seu custo mensal sem obras, sem fixações em telhado e de forma 100% digital.' },
                { q: 'Qual o tempo de instalação e ativação de um sistema próprio?', a: 'Graças ao nosso ecossistema integrado de suprimentos, os projetos residenciais e comerciais são fixados e homologados entre 30 e 45 dias.' },
                { q: 'Qual a manutenção necessária dos módulos?', a: 'A manutenção é baixíssima. Consiste basicamente em realizar uma lavagem simples dos painéis com água limpa a cada 6 meses para remover folhas ou poeira acumulada.' }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <h4 className="font-bold text-white text-base mb-2">{faq.q}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* FOOTER CORPORATIVO PREMIUM */}
      <footer className="w-full bg-black/40 py-8 border-t border-white/[0.05] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
          <p>&copy; 2026 Velox Solar. Engenharia Especializada em Sistemas Fotovoltaicos.</p>
          <div className="flex gap-6 font-medium text-gray-400">
            <span className="hover:text-[#7fcc5e] transition-colors">📞 (61) 98114-0416 / (61) 99561-5570</span>
            <span className="hover:text-[#7fcc5e] transition-colors">veloxsolar.brasilia.ac</span>
          </div>
        </div>
      </footer>

    </div>
  );
}