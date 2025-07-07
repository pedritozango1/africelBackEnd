const express = require('express');
const DocumentosRouter = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const DocumentoController = require('../controllers/DocumentoController');

// Cria pasta uploads/BI se não existir
const pastaDocumento = path.join(__dirname, '..', 'uploads', 'BI');
if (!fs.existsSync(pastaDocumento)) fs.mkdirSync(pastaDocumento, { recursive: true });

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, pastaDocumento),
    filename: (req, file, cb) => {
        const nome = 'documento_bi_' + Date.now() + '_' + file.fieldname + path.extname(file.originalname);
        cb(null, nome);
    }
});
const upload = multer({ storage });

DocumentosRouter.post("/criarDocumento",single(upload),(req,res)=>{ DocumentoController.criarDocumento(req, res) });

DocumentosRouter.get('/listar', (req, res) => DocumentoController.listarDocumento(req, res));

DocumentosRouter.get('/encontrar/:id', (req, res) => DocumentoController.encontrarDocumento(req, res));

DocumentosRouter.delete('/deletar/:id', (req, res) => DocumentoController.deletarDocumento(req, res));

module.exports = DocumentosRouter;
