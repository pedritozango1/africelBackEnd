const express = require('express');
const router = express.Router();
const SimController = require('../controllers/SimController');

router.post('/registar', (req, res) => {
    SimController.criarSim(req, res);
});

router.get('/listar', (req, res) => {
    SimController.listarSim(req, res);
});


router.get('/encontrar/:id', (req, res) => {
    SimController.encontrarSim(req, res);
});


router.get('/usuario/:id_usuario', (req, res) => {
    SimController.listarSimPorUsuario(req, res);
});


router.delete('/deletar/:id', (req, res) => {
    SimController.deletarSim(req, res);
});
router.get('/validarNumero/:numero', (req, res) => {
    SimController.validarNumero(req, res);
});

module.exports = router;
