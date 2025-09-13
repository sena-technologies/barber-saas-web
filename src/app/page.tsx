import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com gradiente e padrão */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-neutral-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        
        {/* Conteúdo principal */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
          <div className="mb-8">
            <img 
              src="/maro.jpg" 
              alt="Maro Barbearia" 
              className="h-24 w-24 mx-auto rounded-full object-cover shadow-premium-lg mb-6"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-gradient-gold">MARO</span>
              <br />
              <span className="text-white">BARBEARIA</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experiência premium em cortes masculinos, barba e cuidados pessoais. 
              Tradição e modernidade em cada atendimento.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/agendamento"
              className="btn-premium px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 group"
            >
              Agendar Horário
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a 
              href="https://instagram.com/barbeariamaro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass px-8 py-4 rounded-full text-lg font-semibold text-white hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @barbeariamaro
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Serviços em Destaque */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nossos <span className="text-gradient-gold">Serviços</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Cuidado premium com técnicas tradicionais e equipamentos modernos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Corte de Cabelo",
                description: "Cortes clássicos e modernos com acabamento impecável",
                price: "R$ 45,00",
                duration: "40 min",
                icon: "✂️"
              },
              {
                title: "Barba Completa",
                description: "Aparar, modelar e finalizar com produtos premium",
                price: "R$ 35,00",
                duration: "30 min",
                icon: "🪒"
              },
              {
                title: "Combo Premium",
                description: "Corte + barba com tratamento completo",
                price: "R$ 75,00",
                duration: "70 min",
                icon: "👑"
              }
            ].map((service, index) => (
              <div key={index} className="card-premium rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-accent-gold font-bold text-xl">{service.price}</span>
                  <span className="text-neutral-500 text-sm">{service.duration}</span>
                </div>
                <Link 
                  href="/agendamento"
                  className="w-full btn-premium py-3 rounded-xl text-center block group-hover:shadow-premium-lg transition-all"
                >
                  Agendar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-premium rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para a <span className="text-gradient-gold">Experiência Maro</span>?
            </h2>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
              Agende seu horário e descubra por que somos referência em cuidados masculinos premium.
            </p>
            <Link 
              href="/agendamento"
              className="btn-premium px-12 py-4 rounded-full text-xl font-semibold inline-flex items-center gap-3 group"
            >
              Agendar Agora
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
