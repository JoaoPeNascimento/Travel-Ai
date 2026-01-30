# IntelliTrip - Backend (Travel-AI)

Este repositório contém o **Backend** da aplicação **IntelliTrip**, uma plataforma inteligente para planejamento e gestão de viagens.

O backend é responsável por toda a lógica de negócios, autenticação, gerenciamento de banco de dados e integração com Inteligência Artificial para sugestões de atividades.

🔗 **Repositório do Frontend:** [https://github.com/JoaoPeNascimento/IntelliTrip]

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias principais:

- **Node.js** & **Express**: Framework base para a API.
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade.
- **Prisma ORM**: Para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Google Gemini AI**: Integração para gerar sugestões inteligentes de viagens e atividades (`@google/generative-ai`).
- **JWT & Bcrypt**: Autenticação segura e criptografia de senhas.
- **Nodemailer**: Envio de e-mails (convites e notificações).

## 📂 Arquitetura

A API serve as seguintes rotas principais:

- `/auth`: Autenticação e registro de usuários.
- `/travel`: Criação e gerenciamento de viagens.
- `/activity`: Gestão de atividades dentro das viagens.
- `/invite`: Sistema de convites para outros usuários participarem da viagem.
- `/ia`: Rotas integradas ao Gemini para funcionalidades de IA.

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL instalado e rodando

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone <https://github.com/JoaoPeNascimento/Travel-Ai>
    cd Travel-Ai
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

    ```env
    PORT=3333
    DATABASE_URL="postgresql://user:password@localhost:5432/traveldb"
    JWT_SECRET="sua_chave_secreta_jwt"
    GEMINI_API_KEY="sua_api_key_do_google_gemini"
    # Configurações de E-mail (Nodemailer)
    EMAIL_USER="seu_email@exemplo.com"
    EMAIL_PASS="sua_senha_de_app"
    ```

4.  **Configure o Banco de Dados:**
    Execute as migrações do Prisma para criar as tabelas:

    ```bash
    npx prisma migrate dev
    ```

5.  **Execute o projeto:**
    - Modo de desenvolvimento:
      ```bash
      npm run dev
      ```
    - Build e produção:
      ```bash
      npm run build
      npm start
      ```

---
