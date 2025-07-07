const UsuarioModel = require('../models/UsuarioModel');

class UsuarioController {
    constructor() {
        this.usuarioModel = new UsuarioModel();
    }
    async criarUsuario(req) {
        let form = req.body.form;

        if (typeof form === 'string') {
            try {
                form = JSON.parse(form);
            } catch (err) {
                throw new Error("Formato inválido para form");
            }
        }

        const frente = req.files?.fileDocCropped?.[0];
        const rosto = req.files?.fileFaceCropped?.[0];
        const selfie = req.files?.fileSelfieCropped?.[0];

        const usuario = {
            nome_completo: form?.nome || null,
            email: form?.email || null,
            bi: form?.biNumber || null,
            imagem_bi_frente: frente?.filename || null,
            imagem_bi_verso: rosto?.filename || null,
            selfie: selfie?.filename || null
        };

        console.log("Dados do usuário a ser inserido:", usuario);

        return new Promise((resolve, reject) => {
            this.usuarioModel.criar(usuario, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }
    async listarUsuarios(req, res) {
        this.usuarioModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    async listarUsuarioUltimo() {
        return new Promise((resolve, reject) => {
            this.usuarioModel.listarUltimo((err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }
    async encontrarPorBI(bi) {
        return new Promise((resolve, reject) => {
            this.usuarioModel.encontrarPorBI(bi,(err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }
    async deletarUsuario(req, res) {
        const id = req.params.id;
        this.usuarioModel.deletar(id, (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Usuário deletado com sucesso.' });
        });
    }

    async encontrarUsuario(req, res) {
        const id = req.params.id;
        this.usuarioModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result[0]);
        });
    }
}

module.exports = new UsuarioController();
