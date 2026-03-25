import express from 'express';
import categorias from '../models/categoriasModel.js'; 

const router = express.Router();

// Obtener todas las categorías desde SQLite
router.get('/api/categorias', async (req, res) => {
  try {
    const listaCategorias = await categorias.findAll(); 
    res.json(listaCategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

router.get('/api/categorias/:id', async (req, res) => {
  try {
    const categoria = await categorias.findByPk(req.params.id);

    if (categoria) {
      res.json(categoria); 
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al obtener la categoría' });
  }
});

export default router;