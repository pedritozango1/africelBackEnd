const db = require('../db/connect');

class VerificacaoModel {
    async gerarCodigoUnicoParaSim(id_sim) {
        let codigo;
        let existente = true;
        while (existente) {
            codigo = this.gerarCodigoVerificacao();
            const [rows] = await db.promise().query(
                `SELECT 1 FROM VERIFICACAO WHERE codigo_enviado = ? AND id_sim = ? AND validado = FALSE`,
                [codigo, id_sim]
            );
            existente = rows.length > 0;
        }

        return codigo;
    }
    gerarCodigoVerificacao() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    criar(verificacao, callback) {
        const sql = `
            INSERT INTO VERIFICACAO (codigo_enviado, timestamp_envio, validado, id_sim)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [
            verificacao.codigo_enviado,
            verificacao.timestamp_envio,
            verificacao.validado,
            verificacao.id_sim
        ], callback);
    }
    listar(callback) {
        const sql = 'SELECT * FROM VERIFICACAO';
        db.query(sql, callback);
    }
    encontrarPorId(id, callback) {
        const sql = 'SELECT * FROM VERIFICACAO WHERE id_verificacao = ?';
        db.query(sql, [id], callback);
    }
    listarPorSim(numero, callback) {
        const sql = 'SELECT * FROM VERIFICACAO WHERE numero = ?';
        db.query(sql, [numero], callback);
    }
    validarCodigo(id_verificacao, callback) {
        const sql = 'UPDATE VERIFICACAO SET validado = TRUE WHERE id_verificacao = ?';
        db.query(sql, [id_verificacao], callback);
    }

    deletar(id_verificacao, callback) {
        const sql = 'DELETE FROM VERIFICACAO WHERE id_verificacao = ?';
        db.query(sql, [id_verificacao], callback);
    }
}

module.exports = VerificacaoModel;
