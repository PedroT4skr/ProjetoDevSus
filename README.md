# 🌿 Consus - Gestão Inteligente de Coleta Seletiva

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Consus** é uma plataforma premium voltada para a revolução da logística de reciclagem em condomínios. Conectamos moradores e coletores através de uma interface intuitiva, eficiente e tecnologicamente avançada.

---

## ✨ Funcionalidades Principais

### 🏠 Para Moradores
- **Solicitação Simplificada**: Agende coletas de diferentes tipos de resíduos (Vidro, Plástico, Papel, Metal) em segundos.
- **Painel de Controle**: Acompanhe o status das suas solicitações ativas e histórico de descartes.
- **Eco-Status**: Visualize seu impacto ambiental positivo através de métricas personalizadas.

### 🚛 Para Coletores
- **Gestão de Plantão**: Ative ou desative seu status de disponibilidade em tempo real.
- **Fila de Demandas**: Visualize e aceite solicitações de coleta com base na localização e urgência.
- **Fluxo de Trabalho Otimizado**: Interface de alta performance para marcar coletas "em rota" ou "concluídas".

### 📊 Para Administradores
- **Dashboard Analítico**: Visão geral do impacto do condomínio (Kg coletados, economia de CO2).
- **Gestão de Usuários**: Controle total sobre moradores e coletores cadastrados.

---

## 🛠️ Stack Tecnológica

- **Core**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Estilização**: CSS Modules (Vanilla CSS) para máxima performance.
- **Animações**: [Framer Motion](https://www.framer.com/motion/) para UX Premium.
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Estado**: Context API para gestão de autenticação e temas.

---

## 🏛️ Arquitetura do Sistema

O projeto segue os princípios de **Clean Architecture** e **Atomic Design**, garantindo escalabilidade e facilidade de manutenção:

```text
src/
├── app/          # Rotas, Layouts e Páginas (Next.js App Router)
├── components/   # Componentes Atômicos e Moleculares
├── features/     # Componentes Complexos de Regra de Negócio
├── contexts/     # Provedores de Estado Global (Auth, Theme)
├── lib/          # Configurações de Banco de Dados (Mock) e Repositórios
├── types/        # Definições de Interfaces TypeScript
└── utils/        # Funções Auxiliares e Formatações
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18.x ou superior
- NPM ou Yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/PedroT4skr/ProjetoDevSus.git
   cd ProjetoDevSus
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse em seu navegador:
   `http://localhost:3000`

---

## 📋 Credenciais de Teste (Mock DB)

| Perfil | Email | Senha |
| :--- | :--- | :--- |
| **Admin** | `admin@consus.com` | `admin` |
| **Morador** | `morador@consus.com` | `123456` |
| **Coletor** | `coletor@consus.com` | `123456` |

---

## 🛤️ Roadmap de Desenvolvimento

- [x] UI/UX Premium com Framer Motion
- [x] Dashboards específicos por Role (Morador, Coletor, Admin)
- [x] Landing Page corporativa com workflow ilustrado
- [ ] Integração real com Banco de Dados (Supabase/Prisma)
- [ ] Sistema de Notificações Push via Service Workers
- [ ] Implementação de Geolocalização real para rotas

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ pela equipe **Consus**.