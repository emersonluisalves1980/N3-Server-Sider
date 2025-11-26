const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Altura = sequelize.define('Altura', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  altura: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'altura_pet', timestamps: false });

module.exports = Altura;
