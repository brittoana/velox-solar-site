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

  const calcularEconomia = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setResultadoSimulacao(null);
    
    try {
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
        console.error("Erro no Python:", erroTexto);
        alert("O servidor Python respondeu com um erro. Tente novamente em instantes.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de conexão. Verifique se a API está online na Vercel.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] font-sans flex flex-col justify-between selection:bg-[#7fcc5e]/30 relative overflow-x-hidden">
      
      {/* Efeitos de fundo minimalistas */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7fcc5e]/5 blur-[120px] pointer-events-none" />

      {/* Botões Flutuantes (WhatsApp e Instagram) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <a href="https://instagram.com/veloxsolar" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-700 hover:text-[#E1306C] p-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-110 border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://wa.me/5561995615570" target="_blank" className="bg-[#25D366] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 flex items-center group">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.596-1.008-5.036-2.846-6.876C16.592 2.147 14.155.989 11.564.989c-5.444 0-9.867 4.371-9.871 9.744-.002 1.81.474 3.578 1.38 5.148L2.082 21.6l6.052-1.588z"/></svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-sm font-bold whitespace-nowrap">Falar Conosco</span>
        </a>
      </div>

      {/* HEADER COM LOGO */}
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-4 z-50 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setAbaAtiva('home')}>
          <img 
            src="/logo-velox.png" 
            alt="Velox Solar Logo" 
            className="w-[140px] md:w-[160px] h-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => { e.target.src = "https://via.placeholder.com/160x50?text=VELOX+SOLAR"; }} 
          />
        </div>

        <nav className="flex flex-wrap justify-center gap-1.5 p-1 bg-gray-100 border border-gray-200 rounded-xl">
          {[{ id: 'home', label: 'Home' }, { id: 'quem-somos', label: 'Quem Somos' }, { id: 'produtos', label: 'Produtos' }, { id: 'parceiros', label: 'Parceiros' }, { id: 'faq', label: 'FAQ' }].map((aba) => (
            <button key={aba.id} onClick={() => { setAbaAtiva(aba.id); setResultadoSimulacao(null); }} className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${abaAtiva === aba.id ? 'bg-white text-[#69b549] shadow-sm font-bold' : 'text-gray-500 hover:text-[#111827]'}`}>{aba.label}</button>
          ))}
        </nav>
      </header>

      {/* CONTEÚDO DINÂMICO */}
      <div className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
        {abaAtiva === 'home' && (
          <main className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#111827] leading-[1.1]">Zere a sua conta de luz com <span className="text-[#69b549]">Alta Performance</span></h1>
              <p className="text-gray-600 text-lg leading-relaxed">Projetamos usinas inteligentes para reduzir seus custos em até 95% com total segurança técnica.</p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <p className="text-3xl font-black text-[#69b549]">+5.000</p>
                  <p className="text-[11px] text-gray-500 uppercase font-bold">Instalações</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <p className="text-3xl font-black text-[#111827]">15 Anos</p>
                  <p className="text-[11px] text-gray-500 uppercase font-bold">Expertise</p>
                </div>
              </div>
            </div>

            {/* SIMULADOR CARD */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#69b549]"></div>
              {!resultadoSimulacao ? (
                <form onSubmit={calcularEconomia} className="space-y-5">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">Simulador Inteligente</h3>
                    <p className="text-gray-500 text-xs mt-1">Calcule sua redução de custos agora</p>
                  </div>
                  <input type="text" name="nome" required placeholder="Seu Nome" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#69b549] outline-none" />
                  <input type="tel" name="telefone" required placeholder="Seu WhatsApp" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#69b549] outline-none" />
                  <div className="flex justify-between items-center px-1">
                    <span className="text-gray-500 text-xs font-bold">Fatura: <span className="text-[#69b549]">R$ {formData.fatura}</span></span>
                  </div>
                  <input type="range" name="fatura" min="150" max="5000" step="50" value={formData.fatura} onChange={handleChange} className="w-full accent-[#69b549]" />
                  <button type="submit" disabled={carregando} className="w-full py-4 bg-[#69b549] text-white font-black rounded-xl hover:bg-[#5da241] transition-all uppercase tracking-widest text-xs">
                    {carregando ? "Calculando..." : "Simular Economia"}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-center text-[#69b549] font-black">Estudo Técnico Pronto!</h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm space-y-2">
                    <div className="flex justify-between"><span>Nova Fatura:</span><span className="font-bold text-[#69b549]">R$ {resultadoSimulacao.nova_fatura_estimada}</span></div>
                    <div className="flex justify-between"><span>Economia Anual:</span><span className="font-bold">R$ {resultadoSimulacao.economia_anual}</span></div>
                  </div>
                  <a href={`https://wa.me/5561995615570?text=${encodeURIComponent(resultadoSimulacao.mensagem_whatsapp)}`} target="_blank" className="block w-full py-4 bg-[#25D366] text-white text-center font-bold rounded-xl text-xs uppercase tracking-widest" rel="noopener noreferrer">Falar com Especialista</a>
                  <button onClick={() => setResultadoSimulacao(null)} className="w-full text-gray-400 text-xs">Simular outro valor</button>
                </div>
              )}
            </div>
          </main>
        )}

        {abaAtiva === 'produtos' && (
          <section className="animate-[fadeIn_0.4s]">
            <h2 className="text-3xl font-black text-center mb-10">Soluções Velox</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: '⚡ Assinatura', d: 'Energia limpa sem obras, direto na sua conta.', img: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=600' },
                { t: '🏡 Residencial', d: 'Sistemas próprios Tier 1 para sua casa.', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600' },
                { t: '🚜 Agronegócio', d: 'Autonomia para irrigação e bombardeamento.', img: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?w=600' }
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={p.img} alt={p.t} className="h-40 w-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="p-6">
                    <h3 className="font-bold mb-2 group-hover:text-[#69b549]">{p.t}</h3>
                    <p className="text-gray-500 text-sm">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* RODAPÉ */}
      <footer className="w-full bg-white py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Velox Solar © 2026</p>
            <p className="text-xs text-gray-400">Engenharia em Sistemas Fotovoltaicos.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2">📞 (61) 99561-5570</span>
            <a href="https://instagram.com/veloxsolar" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition-colors">Instagram</a>
            <a href="https://veloxsolar.com.br" className="text-[#69b549] hover:underline">veloxsolar.com.br</a>
          </div>
        </div>
      </footer>

    </div>
  );
}