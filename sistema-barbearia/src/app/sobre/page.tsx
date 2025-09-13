import Image from "next/image";
import Link from "next/link";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm py-4 px-6 animate-fade-in-up fixed w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity animate-float">
            <Image
              src="/maro-logo.webp"
              alt="Maro Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-gradient">Maro</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/#servicos" className="hover:text-yellow-400 transition-colors">Serviços</Link>
            <Link href="/sobre" className="text-yellow-400">Sobre</Link>
            <Link href="/contato" className="hover:text-yellow-400 transition-colors">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 px-6 bg-overlay parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-8 animate-fade-in-up text-gradient">Nossa História</h1>
          <p className="text-2xl text-gray-300 leading-relaxed animate-fade-in-up animate-stagger-1">
            Há mais de uma década, nossa barbearia tem sido sinônimo de qualidade, tradição e excelência 
            no cuidado masculino. Combinamos técnicas clássicas com as mais modernas tendências, 
            sempre priorizando a satisfação e o bem-estar de nossos clientes.
          </p>
        </div>
      </section>

      {/* Profissionais em Destaque */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">
              Nossos Profissionais
            </h2>
            <p className="text-xl text-gray-300 animate-fade-in-up animate-stagger-1">
              Conheça os mestres por trás da nossa excelência
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Isan - Mais experiente */}
            <div className="bg-gray-800/90 rounded-2xl p-10 text-center hover-lift glow animate-rotate-in animate-stagger-1 border border-yellow-400/20">
              <div className="relative mb-8">
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto flex items-center justify-center shadow-2xl animate-pulse-custom">
                  <span className="text-5xl font-bold text-black">I</span>
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold animate-shimmer">
                  MASTER
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gradient">Isan</h3>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
                <p className="text-yellow-400 font-bold text-xl">+12 anos de experiência</p>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Veterano e mentor da equipe, Isan é reconhecido como um verdadeiro artista da barbearia. 
                Especialista em técnicas tradicionais e tratamentos premium, ele traz mais de uma década 
                de experiência refinada em cada corte.
              </p>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Técnicas Tradicionais</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Tratamentos Premium</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Mentor da Equipe</span>
                </div>
              </div>
            </div>

            {/* Robson */}
            <div className="bg-gray-800/90 rounded-2xl p-10 text-center hover-lift glow animate-rotate-in animate-stagger-2">
              <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse-custom">
                <span className="text-5xl font-bold text-black">R</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gradient">Robson</h3>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
                <p className="text-yellow-400 font-bold text-xl">+9 anos de experiência</p>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Mestre em barbas e bigodes, Robson é conhecido por sua precisão cirúrgica e 
                atenção meticulosa aos detalhes. Cada serviço é executado com perfeição, 
                garantindo resultados impecáveis.
              </p>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Especialista em Barbas</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Precisão Técnica</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Atenção aos Detalhes</span>
                </div>
              </div>
            </div>

            {/* Magno */}
            <div className="bg-gray-800/90 rounded-2xl p-10 text-center hover-lift glow animate-rotate-in animate-stagger-3">
              <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse-custom">
                <span className="text-5xl font-bold text-black">M</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gradient">Magno</h3>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mb-6">
                <p className="text-yellow-400 font-bold text-xl">+8 anos de experiência</p>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Especialista em cortes cl��ssicos e modernos, Magno combina tradição com inovação. 
                Suas técnicas refinadas, desenvolvidas ao longo de sua carreira, garantem 
                resultados únicos e personalizados.
              </p>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Cortes Clássicos</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Tendências Modernas</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  <span>Técnicas Refinadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores e Diferenciais */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-300 animate-fade-in-up animate-stagger-1">
              O que nos torna únicos no mercado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-scale-in animate-stagger-1">
              <div className="text-6xl mb-6 animate-float">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Excelência</h3>
              <p className="text-gray-300 leading-relaxed">
                Produtos premium e equipamentos de última geração para resultados superiores
              </p>
            </div>

            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-scale-in animate-stagger-2">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '1s' }}>⏰</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Pontualidade</h3>
              <p className="text-gray-300 leading-relaxed">
                Respeitamos seu tempo com agendamentos precisos e atendimento ágil
              </p>
            </div>

            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-scale-in animate-stagger-3">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2s' }}>🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Experiência</h3>
              <p className="text-gray-300 leading-relaxed">
                Mais de 10 anos oferecendo o melhor em cuidados masculinos
              </p>
            </div>

            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-scale-in animate-stagger-4">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '3s' }}>💎</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Personalização</h3>
              <p className="text-gray-300 leading-relaxed">
                Cada cliente é único, cada serviço é personalizado às suas necessidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in-up text-gradient">Nossos Números</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in animate-stagger-1">
              <div className="text-5xl font-bold text-yellow-400 mb-3 animate-pulse-custom">10+</div>
              <p className="text-gray-300 text-lg">Anos de Tradição</p>
            </div>
            <div className="animate-scale-in animate-stagger-2">
              <div className="text-5xl font-bold text-yellow-400 mb-3 animate-pulse-custom">5000+</div>
              <p className="text-gray-300 text-lg">Clientes Satisfeitos</p>
            </div>
            <div className="animate-scale-in animate-stagger-3">
              <div className="text-5xl font-bold text-yellow-400 mb-3 animate-pulse-custom">29+</div>
              <p className="text-gray-300 text-lg">Anos de Experiência Combinada</p>
            </div>
            <div className="animate-scale-in animate-stagger-4">
              <div className="text-5xl font-bold text-yellow-400 mb-3 animate-pulse-custom">100%</div>
              <p className="text-gray-300 text-lg">Dedicação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 animate-fade-in-up text-gradient">
            Pronto para uma Experiência Premium?
          </h2>
          <p className="text-xl text-gray-300 mb-12 animate-fade-in-up animate-stagger-1">
            Agende seu horário e descubra por que somos referência em cuidados masculinos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/#servicos" 
              className="bg-black text-white px-10 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors hover-lift glow animate-scale-in animate-stagger-1"
            >
              Ver Serviços
            </Link>
            <Link 
              href="/contato"
              className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors hover-lift glow animate-scale-in animate-stagger-2"
            >
              Agendar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="bg-black/90 py-12 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6 animate-float">
            <Image
              src="/maro-logo.webp"
              alt="Maro Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-3xl font-bold text-gradient">Maro</h3>
          </div>
          <p className="text-gray-300 mb-6 text-lg">
            Rua da Barbearia, 123 - Centro | (11) 99999-9999
          </p>
          <p className="text-gray-500">
            © 2024 Maro Barbearia. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}