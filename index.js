const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Conexão com banco de dados

// Models
const Usuario = require('./models/Usuarios');
const RecuperacaoSenha = require('./models/Codigo'); // <- model Sequelize

// Rotas
const userRoutes = require('./routes/userRoutes');
const recuperacaoSenhaRoutes = require('./routes/RecuperacaoSenha'); // <- rotas de recuperação

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuarios', userRoutes);
app.use('/recuperacao-senha', recuperacaoSenhaRoutes);

// Inicialização do servidor e sincronização dos modelos
async function start() {
  try {
    await db.authenticate();
    console.log('✅ Conectado ao banco de dados');

    await Usuario.sync();
    console.log('🗂️ Modelo Usuario sincronizado');

    await RecuperacaoSenha.sync();
    console.log('🗂️ Modelo RecuperacaoSenha sincronizado');

    app.listen(3000, () => {
      console.log('🚀 API rodando em http://localhost:3000');
    });
  } catch (err) {
    console.error('❌ Falha na inicialização:', err);
  }
}

start();