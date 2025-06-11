const express = require('express');
const router = express.Router();

// Datos de prueba
const bikes = [
    {
        id: 1,
        name: "Montaña Pro 29\"",
        description: "Bicicleta todo terreno con suspensión delantera",
        price: 450000,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "mountain"
    },
    {
        id: 2,
        name: "Urbana Elegance",
        description: "Diseño clásico para la ciudad",
        price: 320000,
        image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "urban"
    },
    {
        id: 3,
        name: "Ruta Velocity",
        description: "Alto rendimiento para carretera",
        price: 580000,
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "road"
    }
];

// Rutas API
router.get('/bikes', (req, res) => {
    res.json(bikes);
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Lógica de autenticación aquí
    res.json({ success: true, user: { name: "Usuario Demo" } });
});

module.exports = router;