const SimModel = require('../models/SimModel');

class SimController {
    constructor() {
        this.simModel = new SimModel();
    }

    async criarSim(req) {
        let form = req.body.form;
        if (typeof form === 'string') {
            try {
                form = JSON.parse(form);
            } catch (err) {
                throw new Error("Formato inválido para form");
            }
        }

        const sim = {
            numero: form.telefone,
            data_registo: new Date().toISOString().split("T")[0],
            id_usuario: req.body.id_usuario
        };

        return new Promise((resolve, reject) => {
            this.simModel.criar(sim, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
    listarSim(req, res) {
        this.simModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }
    async listarSimPornumero(numero, res) {
        return new Promise((resolve, reject) => {
            this.simModel.encontrarPorNumero(numero, (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        })

    }

    encontrarSim(req, res) {
        const id = req.params.id;
        this.simModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (!result.length) return res.status(404).send({ message: "SIM não encontrado." });
            res.send(result[0]);
        });
    }
    listarSimPorUsuario(req) {
        const id_usuario = req.body.id_usuario;
        return new Promise((resolve, reject) => {
            this.simModel.listarPorUsuario(id_usuario, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    deletarSim(req, res) {
        const id = req.params.id;
        this.simModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'SIM deletado com sucesso.' });
        });
    }
    validarNumero(req, res) {
        const numero = req.params.numero;

        this.simModel.listar((err, result) => {
            if (err) {
                return res.status(500).send({ erro: "Erro ao consultar SIMs" });
            }
            const utilizador = result.find(el => el.numero === numero);

            if (!utilizador)

                res.send({ encontrado: false });
            else
                res.send({ encontrado: true });
        });
    }

}

module.exports = new SimController();
