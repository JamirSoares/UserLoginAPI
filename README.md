# UserRouteAPI

API REST construída com **Node.js**, **Express** e **Sequelize** para gerenciamento de usuários e recuperação de senha por código enviado por e-mail.

## 📌 Descrição

O projeto oferece endpoints para:

- Cadastro, login e remoção de usuários
- Atualização de senha com validação por e-mail + CPF
- Envio de código de recuperação de senha por e-mail (`nodemailer`)
- Validação de código com tempo de expiração (1 hora)
- Armazenamento em banco de dados via Sequelize

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório


### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente


### 4. Inicie o servidor

```bash
node index.js
```

Servidor rodará por padrão em:  
📍 `http://localhost:3000`

---

## 🧠 Principais Tecnologias

- Node.js
- Express.js
- Sequelize
- SQLite ou outro banco compatível
- Nodemailer
- dotenv
- bcryptjs
- CORS

---

## 📁 Estrutura de Diretórios

```
.
├── config/
│   └── db.js                # Configuração do Sequelize
├── models/
│   ├── Usuarios.js          # Modelo de usuário
│   └── Codigo.js            # Modelo de recuperação de senha
├── routes/
│   ├── userRoutes.js        # Rotas de usuários
│   └── RecuperacaoSenha.js  # Rotas de recuperação de senha
├── .env                     # Variáveis de ambiente (não versionar)
├── index.js                 # Arquivo principal (inicializa servidor)
├── sync.js                  # Sincroniza tabelas com o banco
└── package.json
```

---

## 🛠️ Endpoints

### Usuários (`/usuarios`)

- `POST /create` — Criação de usuário
- `GET /:id` — Buscar usuário por ID
- `PUT /reset-senha` — Atualizar senha com email + CPF
- `DELETE /:id` — Deletar usuário
- `POST /login` — Login com email e senha

### Recuperação de Senha (`/recuperacao-senha`)

- `POST /recovery` — Envia código por e-mail
- `POST /verify` — Verifica se código está válido e não expirado

---

## 🗃️ Estrutura das Tabelas

### 🔐 `Usuario`

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| id | INTEGER (PK) | Sim |
| nome | STRING(99) | Sim |
| email | STRING(99) | Sim |
| cpf | STRING(11) | Sim |
| senha | STRING(128) | Sim |

---

### ✉️ `RecuperacaoSenha`

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Id | INTEGER (PK) | Sim |
| cpf | STRING(14) | Sim |
| Email | STRING(255) | Sim |
| CodigoRecuperacao | STRING(100) | Sim |
| ExpiraEm | STRING(100) | Sim |
| CriadoEm | STRING(100) | Sim |

---

## 👨‍💻 Autor

**Jamir Soares Rodrigues**

---

## 📝 Licença

Este projeto ainda **não possui licença definida**.
