const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(99),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(99),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;