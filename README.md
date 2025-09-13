# Barber SaaS Web 💈

Sistema completo para barbearias com agendamento online, loja de produtos e automação via WhatsApp.

## 🚀 Funcionalidades

### ✅ Implementado
- **Sistema de Agendamento**: Página completa com seleção de serviços, datas e horários
- **Validação Inteligente**: Detecção automática de conflitos de horário
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **Persistência Local**: Armazenamento temporário até integração com backend
- **WhatsApp Integration**: Geração de links para lembretes manuais

### 🔄 Em Desenvolvimento
- **Página de Serviços**: Catálogo completo de serviços oferecidos
- **Loja Online**: Sistema de produtos com carrinho de compras
- **Backend API**: API multi-tenant para reutilização entre barbearias
- **Automação WhatsApp**: Lembretes automáticos 1h antes do agendamento

### 📋 Roadmap
- **Sistema de Pagamentos**: Integração com Pix e cartões
- **Painel Administrativo**: Gestão de agendamentos e produtos
- **Multi-tenant**: Suporte a múltiplas barbearias
- **Analytics**: Dashboard com métricas de negócio

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS v4
- **Validação**: Zod + React Hook Form
- **UI Components**: Radix UI primitives
- **Ícones**: Lucide React
- **Data**: date-fns para manipulação de datas

## 🏃‍♂️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# Clonar repositório
git clone https://github.com/sena-technologies/barber-saas-web.git
cd barber-saas-web

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

### Acessar
- **Home**: http://localhost:3000
- **Agendamento**: http://localhost:3000/agendamento

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── agendamento/         # Página de agendamento
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
└── components/              # Componentes reutilizáveis (futuro)
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linting do código
```

## 🎯 Como Testar o Agendamento

1. Acesse `/agendamento`
2. Selecione um serviço (Corte, Barba ou Combo)
3. Escolha uma data (hoje ou futura)
4. Selecione um horário disponível
5. Preencha seus dados (nome e WhatsApp)
6. Confirme o agendamento
7. Use o link gerado para testar o WhatsApp

## 🏗️ Arquitetura Futura (Monorepo)

```
barber-saas-web/
├── apps/
│   ├── web/                 # Frontend (atual)
│   ├── api/                 # Backend API
│   └── worker/              # Jobs WhatsApp
├── packages/
│   ├── core/                # Regras de negócio
│   ├── sdk/                 # Cliente da API
│   ├── ui/                  # Componentes
│   └── types/               # Tipos compartilhados
```

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Convenção de Commits
Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Sena Technologies**
- GitHub: [@sena-technologies](https://github.com/sena-technologies)
- Email: contato@senatechnologies.com

---

Desenvolvido com ❤️ pela equipe Sena Technologies