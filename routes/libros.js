const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro')
const { requiredScopes } = require("express-oauth2-jwt-bearer");


// Ruta para obtener todos los libros
router.get('/', requiredScopes("read:productos"), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros de la biblioteca.' });
    }
});

// Ruta para obtener un libro por su id
router.get('/:id', requiredScopes("read:libros"), async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro de la biblioteca.' });
    }
});

// Ruta para crear un nuevo libro
router.post('/', requiredScopes("write:libros"), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el libro en la biblioteca.' });
    }
});

// Ruta para actualizar un libro existente
router.put('/:id', requiredScopes("write:libros"), async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro de la biblioteca.' });
    }
});

// Ruta para eliminar un libro existente
router.delete('/:id', requiredScopes("write:libros"), async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ message: 'Libro eliminado correctamente de la biblioteca.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro de la biblioteca' });
    }
});
 
module.exports = router;