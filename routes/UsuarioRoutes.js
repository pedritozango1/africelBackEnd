const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const SimController = require("../controllers/SimController")
const VerificacaoController = require("../controllers/VerificacaoController")
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const pastaDocumento = path.join(__dirname, '..', 'uploads', 'BI');
if (!fs.existsSync(pastaDocumento)) fs.mkdirSync(pastaDocumento, { recursive: true });
const storage = multer.diskStorage({
     destination: (req, file, cb) => cb(null, pastaDocumento),
     filename: (req, file, cb) => {
          const nome = 'documento_bi_' + Date.now() + '_' + file.fieldname + path.extname(file.originalname);
          cb(null, nome);
     }
});
const upload = multer({ storage });
// 📌 Função
async function criarDocumento(req, res) {
     try {
          const frente = req.files?.fileDocCropped?.[0];
          const selfie = req.files?.fileSelfieCropped?.[0];
          const rosto = req.files?.fileFaceCropped?.[0];

          if (!frente || !selfie || !rosto) {
               return res.status(400).json({ erro: "Faltam imagens: documento, selfie ou rosto" });
          }

          const caminhoFrente = path.resolve(frente.path);
          const caminhoSelfie = path.resolve(selfie.path);
          const caminhoRosto = path.resolve(rosto.path);

          await UsuarioController.criarUsuario(req);
          const ultimoUsuario = await UsuarioController.listarUsuarioUltimo();
          req.body.id_usuario = ultimoUsuario.id_usuario;
          await SimController.criarSim(req);
          return res.status(200).json({
               mensagem: "Documento recebido com sucesso!",
          });

     } catch (err) {
          console.error("Erro em criarDocumento:", err);
          return res.status(500).json({ erro: "Erro interno no servidor", detalhe: err.message });
     }
}

// 📌 Rota atualizada
router.post(
     '/registarNovo',
     upload.fields([
          { name: 'fileDocCropped', maxCount: 1 },
          { name: 'fileSelfieCropped', maxCount: 1 },
          { name: 'fileFaceCropped', maxCount: 1 }
     ]),
     (req, res) => {
          criarDocumento(req, res);
     }
);
// Rota com upload + dados
router.post('/encontarPornumero', async (req, res) => {
     let form = req.body.form;
     if (typeof form === 'string') {
          try {
               form = JSON.parse(form);
          } catch (err) {
               throw new Error("Formato inválido para form");
          }
     }
     const usurio = await UsuarioController.encontrarPorBI(form.bi, res);
     if (usurio) {
          res.json(usurio);
     }
});
router.get('/registarExistente', async (req, res) => {
     let form = req.body.form;
     if (typeof form === 'string') {
          try {
               form = JSON.parse(form);
          } catch (err) {
               throw new Error("Formato inválido para form");
          }
     }
     const usurio = await UsuarioController.encontrarPorBI(form.bi, res);
     req.body.id_usuario = usurio.id_usuario;
     await SimController.criarSim(req);
     res.json({ messagem: 'Usuario Regitado com exito' });
});
router.get('/listar', (req, res) => {
     UsuarioController.listarUsuarios(req, res);
});
router.get('/EncontarID/:id', UsuarioController.encontrarUsuario);
router.delete('/DeletarID/:id', UsuarioController.deletarUsuario);


module.exports = router;
