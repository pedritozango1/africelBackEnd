const VerificacaoModel = require('../models/VerificacaoModel');
const SimController = require("../controllers/SimController");
const { simModel } = require('./SimController');
const { promises } = require('form-data');
class VerificacaoController {
    verificacaoModel = null;
    constructor() {
        this.verificacaoModel = new VerificacaoModel();
    }
    criarVerificacao = async (req, res) => {
        if (!req.body.form) {
            return res.status(400).json({ erro: 'Form é obrigatório' });
        }
        console.log(req.body.form);

        let form = req.body.form;
        if (typeof form === 'string') {
            try {
                form = JSON.parse(form);
            } catch (err) {
                throw new Error("Formato inválido para form");
            }
        }
        const numero = await SimController.listarSimPornumero(form.phone);
        console.log(numero);
        const { id_sim } = numero;
        const codigo = await this.verificacaoModel.gerarCodigoUnicoParaSim(id_sim);
        const agora = new Date();
        agora.setMinutes(0);
        agora.setSeconds(50);
        const timestamp_envio = agora.toISOString().slice(0, 19).replace('T', ' ');
        const novaVerificacao = {
            codigo_enviado: codigo,
            timestamp_envio,
            validado: false,
            id_sim: id_sim
        };

        return new Promise((resolve, reject) => {
            this.verificacaoModel.criar(novaVerificacao, (err, result) => {
                if (err) reject(err);
                resolve(novaVerificacao);
            });
        });


    };

    listarVerificacoes(req, res) {
        this.verificacaoModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }
    encontrarVerificacao(req, res) {
        const id = req.params.id;
        this.verificacaoModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (!result.length) return res.status(404).send({ message: 'Verificação não encontrada.' });
            res.send(result[0]);
        });
    }


    listarPorSim(req, res) {
        const id_sim = req.params.id_sim;
        this.verificacaoModel.listarPorSim(id_sim, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    validar(req, res) {
        const id = req.params.id;
        this.verificacaoModel.validarCodigo(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Código validado com sucesso.' });
        });
    }

    deletarVerificacao(req, res) {
        const id = req.params.id;
        this.verificacaoModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Verificação deletada com sucesso.' });
        });
    }
}

module.exports = new VerificacaoController();
