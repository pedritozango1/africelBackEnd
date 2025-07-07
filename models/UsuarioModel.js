const db = require('../db/connect');

class UsuarioModel {
    criar(usuario, callback) {
        const sql = `
            INSERT INTO USUARIO (nome_completo, email, bi, imagem_bi_frente, imagem_bi_verso, selfie)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            usuario.nome_completo,
            usuario.email,
            usuario.bi,
            usuario.imagem_bi_frente,
            usuario.imagem_bi_verso,
            usuario.selfie
        ], callback);
    }

    listar(callback) {
        db.query(`SELECT * FROM USUARIO`, callback);
    }

    listarUltimo(callback) {
        db.query(`SELECT * FROM USUARIO ORDER BY id_usuario DESC LIMIT 1`, callback);
    }

    deletar(id, callback) {
        db.query(`DELETE FROM USUARIO WHERE id_usuario = ?`, [id], callback);
    }
    encontrarPorBI(bi, callback) {
        db.query(`SELECT * FROM USUARIO WHERE bi = ?`, [bi], callback);
    }
    encontrarPorId(id, callback) {
        db.query(`SELECT * FROM USUARIO WHERE id_usuario = ?`, [id], callback);
    }
}

module.exports = UsuarioModel;
