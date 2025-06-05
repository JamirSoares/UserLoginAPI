require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_INSTANCE 
      ? `${process.env.DB_HOST}\\${process.env.DB_INSTANCE}`
      : process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT, 10),
    dialectOptions: {
      options: {
        encrypt: false, // ou true se estiver com SSL
        trustServerCertificate: true
      }
    },
    logging: false
  }
);

module.exports = sequelize;