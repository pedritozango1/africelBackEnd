const db = require('../db/connect');
class DocumentModel {
    criar(documento, callback) {
        const sql = `
            INSERT INTO DOCUMENTO (
                numero_bi,
                imagem_bi_frente,
                imagem_bi_verso,
                data_emissao,
                id_usuario
            ) VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [
            documento.numero_bi,
            documento.imagem_bi_frente,
            documento.imagem_bi_verso,
            documento.data_emissao,
            documento.id_usuario
        ], callback);
    }

    ObterTdos(callback) {
        const sql = 'SELECT * FROM DOCUMENTO';
        db.query(sql, callback);
    }

    ObterPorID(id, callback) {
        const sql = 'SELECT * FROM DOCUMENTO WHERE id_documento = ?';
        db.query(sql, [id], callback);
    }

    deletar(id, callback) {
        const sql = 'DELETE FROM DOCUMENTO WHERE id_documento = ?';
        db.query(sql, [id], callback);
    }
}
module.exports = DocumentModel;