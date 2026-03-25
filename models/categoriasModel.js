import { DataTypes } from 'sequelize';
import sequelize from './configurarSequelize.js'; 

const categorias = sequelize.define('categorias', {
  IdCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default categorias;