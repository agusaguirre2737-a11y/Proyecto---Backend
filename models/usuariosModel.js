import { DataTypes } from 'sequelize';
import sequelize from './configurarSequelize.js'; // <-- Importante el .js

const usuarios = sequelize.define('usuarios', {
  IdUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

console.log('usuariosModel.js');

export default usuarios;