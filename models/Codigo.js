const {
  DataTypes
} = require('sequelize');
const db = require('../config/db'); // instância do Sequelize

const RecuperacaoSenha = db.define('RecuperacaoSenha', {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  CodigoRecuperacao: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ExpiraEm: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  CriadoEm: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'RecuperacaoSenha',
  timestamps: false,
});

module.exports = RecuperacaoSenha;