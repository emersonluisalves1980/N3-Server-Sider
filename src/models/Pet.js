const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Tutor = require('./Tutor');
const Altura = require('./Altura');

const Pet = sequelize.define('Pet', {
  codigo_pet: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome_pet: { type: DataTypes.STRING, allowNull: false },
  genero_pet: { type: DataTypes.STRING(10), allowNull: false },
  altura_cm: { type: DataTypes.FLOAT, allowNull: false }
}, { tableName: 'pet', timestamps: false });

// associations
Tutor.hasMany(Pet, { foreignKey: 'tutorCpf' });
Pet.belongsTo(Tutor, { foreignKey: 'tutorCpf' });

Altura.hasMany(Pet, { foreignKey: 'id_altura' });
Pet.belongsTo(Altura, { foreignKey: 'id_altura' });

module.exports = Pet;
