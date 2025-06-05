// sync.js
const sequelize = require('./db');
const Usuario = require('../models/Usuarios');
const RecuperacaoSenha = require('../models/Codigo');

(async () => {
  await sequelize.sync({
    alter: true
  }); // ou { force: true } para apagar e recriar
  console.log('🗂️ Tabelas sincronizadas com o banco de dados');
})();