const express = require('express');
const router = express.Router();
const VerificacaoController = require('../controllers/VerificacaoController');


router.post('/registar', (req, res) => {
    VerificacaoController.criarVerificacao(req, res);
});

router.get('/rastrear', (req, res) => {
    console.log("Estou bm dentro shcsdk dsjsfh fodihds pakddlskklsa");
});
router.get('/listar', (req, res) => {
    VerificacaoController.listarVerificacoes(req, res);
});

router.get('/encontrar/:id', (req, res) => {
    VerificacaoController.encontrarVerificacao(req, res);
});

router.get('/sim/:id_sim', (req, res) => {
    VerificacaoController.listarPorSim(req, res);
});

router.put('/validar/:id', (req, res) => {
    VerificacaoController.validar(req, res);
});

router.delete('/deletar/:id', (req, res) => {
    VerificacaoController.deletarVerificacao(req, res);
});

module.exports = router;
