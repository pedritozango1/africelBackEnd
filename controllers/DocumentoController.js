const DocumentModel = require("../models/DocumentoModel");

class DocumentoController {
    documentModel = null;

    constructor() {
        this.documentModel = new DocumentModel();
    }

    criarDocumento(req, res) {
        const imagemFrente = req.files?.imagem_bi_frente?.[0]?.filename || null;
        const imagemVerso = req.files?.imagem_bi_verso?.[0]?.filename || null;

        const documento = {
            numero_bi: req.body.numero_bi,
            imagem_bi_frente: imagemFrente ? `/uploads/bi/${imagemFrente}` : null,
            imagem_bi_verso: imagemVerso ? `/uploads/bi/${imagemVerso}` : null,
            data_emissao: req.body.data_emissao,
            id_usuario: req.body.id_usuario
        };

        this.documentModel.criar(documento, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({
                message: 'Documento cadastrado com sucesso!',
                id: result.insertId
            });
        });
    }

    listarDocumento(req, res) {
        this.documentModel.ObterTdos((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    deletarDocumento(req, res) {
        const id = req.params.id;
        this.documentModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Documento deletado com sucesso.' });
        });
    }

    encontrarDocumento(req, res) {
        const id = req.params.id;
        this.documentModel.ObterPorID(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result[0]);
        });
    }
}

module.exports = new DocumentoController();
