"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: '',
    data: '',
    horario: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de envio do formulário
    const whatsappMessage = `Olá! Gostaria de agendar um horário:
    
Nome: ${formData.nome}
Telefone: ${formData.telefone}
Serviço: ${formData.servico}
Data: ${formData.data}
Horário: ${formData.horario}
Mensagem: ${formData.mensagem}`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm py-4 px-6 animate-fade-in-up">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/maro-logo.webp"
              alt="Maro Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-yellow-400">Maro</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/#servicos" className="hover:text-yellow-400 transition-colors">Serviços</Link>
            <Link href="/sobre" className="hover:text-yellow-400 transition-colors">Sobre</Link>
            <Link href="/contato" className="text-yellow-400">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 bg-overlay parallax"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up text-gradient">Entre em Contato</h1>
          <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up animate-stagger-1">
            Agende seu horário e experimente o melhor em cuidados masculinos
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold mb-8 text-gradient">Agende seu Horário</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-400">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-400">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-400">Serviço Desejado</label>
                  <select
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="Corte de Cabelo - R$ 45,00">Corte de Cabelo - R$ 45,00</option>
                    <option value="Barba Completa - R$ 35,00">Barba Completa - R$ 35,00</option>
                    <option value="Combo Premium - R$ 75,00">Combo Premium - R$ 75,00</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-400">Data Preferida</label>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-400">Horário Preferido</label>
                    <select
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione um horário</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-yellow-400">Mensagem (Opcional)</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder="Alguma observação especial?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors glow hover-lift"
                >
                  Agendar via WhatsApp
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold mb-8 text-gradient">Informações de Contato</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 hover-lift p-4 bg-gray-800 rounded-lg">
                  <div className="text-yellow-400 text-2xl">📍</div>
                  <div>
                    <h3 className="font-semibold mb-2">Endereço</h3>
                    <p className="text-gray-300">Rua Vice Pref. Ivan Rodrigues, 16<br />Aventureiro  - Joinville, SC<br />CEP: 89225 - 600</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover-lift p-4 bg-gray-800 rounded-lg">
                  <div className="text-yellow-400 text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold mb-2">Telefone</h3>
                    <p className="text-gray-300">(47) 98852-8183</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover-lift p-4 bg-gray-800 rounded-lg">
                  <div className="text-yellow-400 text-2xl">⏰</div>
                  <div>
                    <h3 className="font-semibold mb-2">Horário de Funcionamento</h3>
                    <div className="text-gray-300 space-y-1">
                      <p>Segunda a Sexta: 8h às 19h</p>
                      <p>Sábado: 8h às 17h</p>
                      <p>Domingo: Fechado</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 hover-lift p-4 bg-gray-800 rounded-lg">
                  <div className="text-yellow-400 text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">contato@marobarbearia.com.br</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Siga-nos nas Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/barbeariamaro/" className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors hover-lift">
                    <span className="text-xl">@barbeariamaro</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section 
        className="py-16 px-6 bg-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fade-in-up text-gradient">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a 
              href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar um horário."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg transition-colors hover-lift glow animate-scale-in animate-stagger-1"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p>Agende rapidamente via WhatsApp</p>
            </a>

            <a 
              href="tel:+5511999999999"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition-colors hover-lift glow animate-scale-in animate-stagger-2"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Ligar Agora</h3>
              <p>Fale diretamente conosco</p>
            </a>

            <Link 
              href="/#servicos"
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 rounded-lg transition-colors hover-lift glow animate-scale-in animate-stagger-3"
            >
              <div className="text-4xl mb-4">✂️</div>
              <h3 className="text-xl font-bold mb-2">Ver Serviços</h3>
              <p>Conheça nossos serviços</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/maro-logo.webp"
              alt="Maro Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h3 className="text-2xl font-bold text-yellow-400">Maro</h3>
          </div>
          <p className="text-gray-400 mb-4">
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