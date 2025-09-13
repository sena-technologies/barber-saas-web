# Workflow de Desenvolvimento - Barber SaaS Web

## Estrutura de Branches

### Branches Principais
- **`main`**: Código em produção, sempre estável
- **`develop`**: Branch de integração para desenvolvimento

### Branches de Feature
- **`feature/nome-da-funcionalidade`**: Para novas funcionalidades
- **`bugfix/nome-do-bug`**: Para correções de bugs
- **`hotfix/nome-do-hotfix`**: Para correções urgentes em produção

## Convenção de Commits (Conventional Commits)

### Formato
```
tipo(escopo): descrição breve

Descrição detalhada (opcional)

Closes #123 (se aplicável)
```

### Tipos de Commit
- **`feat`**: Nova funcionalidade
- **`fix`**: Correção de bug
- **`docs`**: Documentação
- **`style`**: Formatação, espaços em branco, etc.
- **`refactor`**: Refatoração de código
- **`test`**: Adição ou correção de testes
- **`chore`**: Tarefas de build, configuração, etc.
- **`perf`**: Melhoria de performance
- **`ci`**: Configuração de CI/CD

### Exemplos de Commits
```bash
feat(agendamento): adiciona validação de horários disponíveis
fix(layout): corrige responsividade do header em mobile
docs(readme): atualiza instruções de instalação
style(components): ajusta formatação dos componentes de UI
refactor(utils): extrai lógica de formatação de data para utils
test(agendamento): adiciona testes para validação de conflitos
chore(deps): atualiza dependências do projeto
```

## Fluxo de Trabalho

### 1. Criando uma Nova Feature
```bash
# Atualizar develop
git checkout develop
git pull origin develop

# Criar branch de feature
git checkout -b feature/pagina-servicos

# Desenvolver e fazer commits
git add .
git commit -m "feat(servicos): implementa listagem de serviços disponíveis"

# Push da branch
git push origin feature/pagina-servicos
```

### 2. Pull Request
- Criar PR da `feature/pagina-servicos` para `develop`
- Título descritivo: "feat: Implementa página de serviços"
- Descrição detalhada das mudanças
- Revisar código antes do merge

### 3. Release
```bash
# Merge develop -> main quando pronto para produção
git checkout main
git merge develop
git tag v1.0.0
git push origin main --tags
```

## Estrutura de Projeto (Monorepo Futuro)

```
barber-saas-web/
├── apps/
│   ├── web/                 # Frontend Next.js (atual)
│   ├── api/                 # Backend API
│   └── worker/              # Jobs e lembretes WhatsApp
├── packages/
│   ├── core/                # Regras de negócio
│   ├── sdk/                 # Cliente da API
│   ├── ui/                  # Componentes compartilhados
│   ├── config/              # Configurações ESLint, TS, etc.
│   └── types/               # Tipos TypeScript
├── docs/                    # Documentação
└── tools/                   # Scripts e ferramentas
```

## Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Executa linting
npm run type-check   # Verificação de tipos
```

### Git
```bash
# Ver branches
git branch -a

# Limpar branches locais já mergeadas
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# Atualizar todas as branches
git fetch --all --prune
```

## Próximas Features Planejadas

### Sprint 1 - Páginas Base
- [ ] `feature/pagina-servicos` - Página de serviços
- [ ] `feature/pagina-loja` - Página da loja de produtos
- [ ] `feature/carrinho-compras` - Sistema de carrinho

### Sprint 2 - Melhorias UX
- [ ] `feature/date-picker` - Melhorar seletor de data
- [ ] `feature/toast-notifications` - Sistema de notificações
- [ ] `feature/loading-states` - Estados de carregamento

### Sprint 3 - Backend Integration
- [ ] `feature/api-integration` - Integração com API
- [ ] `feature/whatsapp-automation` - Automação WhatsApp
- [ ] `feature/payment-system` - Sistema de pagamentos

## Configuração do Repositório

### Após clonar
```bash
git clone https://github.com/sena-technologies/barber-saas-web.git
cd barber-saas-web
npm install
npm run dev
```

### Configurar Git (primeira vez)
```bash
git config user.name "Seu Nome"
git config user.email "seu.email@exemplo.com"
```

## Deploy

### Vercel (Recomendado para Frontend)
- Conectar repositório GitHub
- Auto-deploy da branch `main`
- Preview deploys para PRs

### Configuração de Ambiente
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.barbersaas.com
WHATSAPP_API_KEY=your_key_here
DATABASE_URL=postgresql://...
```