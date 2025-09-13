"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Carlos Silva",
      rating: 5,
      comment: "Excelente atendimento! O Isan é um verdadeiro artista. Sempre saio satisfeito com o corte.",
      service: "Corte de Cabelo"
    },
    {
      name: "Roberto Santos",
      rating: 5,
      comment: "A melhor barbearia da região! O Robson faz uma barba perfeita, muito profissional.",
      service: "Barba Completa"
    },
    {
      name: "João Oliveira",
      rating: 5,
      comment: "Combo premium vale muito a pena! Saio sempre renovado. Equipe nota 10!",
      service: "Combo Premium"
    },
    {
      name: "Pedro Costa",
      rating: 5,
      comment: "Ambiente acolhedor e profissionais experientes. Recomendo para todos os amigos.",
      service: "Corte de Cabelo"
    },
    {
      name: "Lucas Ferreira",
      rating: 5,
      comment: "Magno é incrível! Sempre entende exatamente o que eu quero. Atendimento top!",
      service: "Corte de Cabelo"
    },
    {
      name: "André Martins",
      rating: 5,
      comment: "Tradição e qualidade em um só lugar. Anos de experiência fazem a diferença!",
      service: "Combo Premium"
    },
    {
      name: "Rafael Lima",
      rating: 5,
      comment: "Pontualidade e qualidade sempre! Nunca me decepcionaram em nenhum serviço.",
      service: "Barba Completa"
    },
    {
      name: "Thiago Alves",
      rating: 5,
      comment: "Produtos de qualidade e técnicas modernas. A barbearia evoluiu muito!",
      service: "Combo Premium"
    },
    {
      name: "Marcelo Rocha",
      rating: 5,
      comment: "Atendimento personalizado e resultado sempre perfeito. Virei cliente fiel!",
      service: "Corte de Cabelo"
    },
    {
      name: "Fernando Dias",
      rating: 5,
      comment: "Ambiente masculino autêntico e profissionais que entendem do assunto!",
      service: "Barba Completa"
    },
    {
      name: "Gabriel Souza",
      rating: 5,
      comment: "Preço justo e qualidade excepcional. Melhor custo-benefício da cidade!",
      service: "Combo Premium"
    },
    {
      name: "Ricardo Mendes",
      rating: 5,
      comment: "Tradição familiar e atendimento de primeira. Recomendo de olhos fechados!",
      service: "Corte de Cabelo"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm py-4 px-6 animate-fade-in-up fixed w-full z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 animate-float">
            <Image
              src="/maro-logo.webp"
              alt="Maro Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gradient">Maro</h1>
          </div>
          <nav className="flex gap-6">
            <a href="#servicos" className="hover:text-yellow-400 transition-colors">Serviços</a>
            <Link href="/sobre" className="hover:text-yellow-400 transition-colors">Sobre</Link>
            <Link href="/contato" className="hover:text-yellow-400 transition-colors">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-overlay parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-6 animate-fade-in-up text-gradient">Estilo e Tradição</h2>
          <p className="text-2xl text-gray-300 mb-8 animate-fade-in-up animate-stagger-1">A melhor experiência em cuidados masculinos</p>
          <Link 
            href="/contato"
            className="bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold hover:bg-yellow-500 transition-colors glow hover-lift animate-scale-in animate-stagger-2 inline-block"
          >
            Agendar Horário
          </Link>
        </div>
      </section>

      {/* Serviços Section */}
      <section 
        id="servicos" 
        className="py-20 px-6 bg-overlay parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-300 animate-fade-in-up animate-stagger-1">
              Cuidado premium com técnicas tradicionais e equipamentos modernos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Corte de Cabelo */}
            <div className="relative bg-gray-800/90 rounded-xl overflow-hidden group hover-lift glow animate-scale-in animate-stagger-1">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/cabelo.webp)' }}
              ></div>
              <div className="relative p-8 text-center">
                <h3 className="text-3xl font-bold mb-6 mt-4 text-gradient">Corte de Cabelo</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Cortes clássicos e modernos com acabamento impecável
                </p>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-3xl font-bold text-yellow-400">R$ 45,00</span>
                  <span className="text-gray-400 text-lg">40 min</span>
                </div>
                <Link 
                  href="/contato"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors block text-center hover-lift"
                >
                  Agendar
                </Link>
              </div>
            </div>

            {/* Barba Completa */}
            <div className="relative bg-gray-800/90 rounded-xl overflow-hidden group hover-lift glow animate-scale-in animate-stagger-2">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundImage: 'url(/barba.webp)' }}
              ></div>
              <div className="relative p-8 text-center">
                <h3 className="text-3xl font-bold mb-6 mt-4 text-gradient">Barba Completa</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Aparar, modelar e finalizar com produtos premium
                </p>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-3xl font-bold text-yellow-400">R$ 35,00</span>
                  <span className="text-gray-400 text-lg">30 min</span>
                </div>
                <Link 
                  href="/contato"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors block text-center hover-lift"
                >
                  Agendar
                </Link>
              </div>
            </div>

            {/* Combo Premium */}
            <div className="relative bg-gray-800/90 rounded-xl overflow-hidden group hover-lift glow animate-scale-in animate-stagger-3">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url(/premium-cabelo.webp)' }}
                ></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
                  style={{ backgroundImage: 'url(/premium-barba.webp)' }}
                ></div>
              </div>
              <div className="relative p-8 text-center">
                <h3 className="text-3xl font-bold mb-6 mt-4 text-gradient">Combo Premium</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Corte + barba com tratamento completo
                </p>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-3xl font-bold text-yellow-400">R$ 75,00</span>
                  <span className="text-gray-400 text-lg">70 min</span>
                </div>
                <Link 
                  href="/contato"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors block text-center hover-lift"
                >
                  Agendar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-300 animate-fade-in-up animate-stagger-1">
              Mais de 5000 clientes satisfeitos confiam em nosso trabalho
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentTestimonial * 320}px)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="carousel-item">
                    <div className="bg-gray-800/90 p-8 rounded-xl hover-lift glow h-64 flex flex-col justify-between">
                      <div>
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">⭐</span>
                          ))}
                        </div>
                        <p className="text-gray-300 mb-4 italic leading-relaxed">
                          "{testimonial.comment}"
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-yellow-400">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.service}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-colors hover-lift glow"
            >
              ←
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-colors hover-lift glow"
            >
              →
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">
              Sobre Nós
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-fade-in-up animate-stagger-1 leading-relaxed">
              Somos uma barbearia tradicional que combina técnicas clássicas com o melhor da modernidade. 
              Nossa equipe é formada por profissionais experientes e apaixonados pela arte da barbearia.
            </p>
          </div>

          {/* Profissionais */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-rotate-in animate-stagger-1">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg animate-pulse-custom">
                <span className="text-4xl font-bold text-black">M</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gradient">Magno</h3>
              <p className="text-yellow-400 font-semibold mb-4 text-lg">+8 anos de experiência</p>
              <p className="text-gray-300 leading-relaxed">
                Especialista em cortes clássicos e modernos, com técnicas refinadas 
                desenvolvidas ao longo de sua carreira.
              </p>
            </div>

            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-rotate-in animate-stagger-2">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg animate-pulse-custom">
                <span className="text-4xl font-bold text-black">R</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gradient">Robson</h3>
              <p className="text-yellow-400 font-semibold mb-4 text-lg">+9 anos de experiência</p>
              <p className="text-gray-300 leading-relaxed">
                Mestre em barbas e bigodes, conhecido por sua precisão e 
                atenção aos detalhes em cada serviço.
              </p>
            </div>

            <div className="text-center bg-gray-800/90 p-8 rounded-xl hover-lift glow animate-rotate-in animate-stagger-3">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg animate-pulse-custom">
                <span className="text-4xl font-bold text-black">I</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gradient">Isan</h3>
              <p className="text-yellow-400 font-semibold mb-4 text-lg">+12 anos de experiência</p>
              <p className="text-gray-300 leading-relaxed">
                Veterano da equipe, especialista em tratamentos premium e 
                técnicas tradicionais de barbearia.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up animate-stagger-1">
              <div className="text-6xl mb-6 animate-float">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Qualidade</h3>
              <p className="text-gray-300 leading-relaxed">
                Utilizamos apenas produtos premium e equipamentos de última geração
              </p>
            </div>

            <div className="text-center animate-fade-in-up animate-stagger-2">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '1s' }}>⏰</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Pontualidade</h3>
              <p className="text-gray-300 leading-relaxed">
                Respeitamos seu tempo com agendamentos precisos e atendimento ágil
              </p>
            </div>

            <div className="text-center animate-fade-in-up animate-stagger-3">
              <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2s' }}>🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">Experiência</h3>
              <p className="text-gray-300 leading-relaxed">
                Mais de 10 anos oferecendo o melhor em cuidados masculinos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        className="py-20 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 animate-fade-in-up text-gradient">
            Pronto para uma Nova Experiência?
          </h2>
          <p className="text-xl text-gray-300 mb-12 animate-fade-in-up animate-stagger-1">
            Agende seu horário e descubra por que somos referência em cuidados masculinos
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contato"
              className="bg-yellow-400 text-black px-10 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors glow hover-lift animate-scale-in animate-stagger-1"
            >
              Agendar Agora
            </Link>
            <Link 
              href="/sobre"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-10 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors hover-lift animate-scale-in animate-stagger-2"
            >
              Conhecer Mais
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