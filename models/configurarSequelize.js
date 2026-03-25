import { Sequelize } from 'sequelize';

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/pymes.db', 
  define: {
    freezeTableName: true, 
    timestamps: false, 
  },
});

export default sequelize; 