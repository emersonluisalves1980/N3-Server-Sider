const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tutor = sequelize.define('Tutor', {
  cpf: { type: DataTypes.STRING, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'tutor', timestamps: false });

module.exports = Tutor;
