const db = require('../db/connect');

class SimModel {
    criar(sim, callback) {
        const sql = `
            INSERT INTO SIM (numero, data_registo, id_usuario)
            VALUES (?, ?, ?)
        `;
        db.query(sql, [
            sim.numero,
            sim.data_registo,
            sim.id_usuario
        ], callback);
    }

    listar(callback) {
        const sql = 'SELECT * FROM SIM';
        db.query(sql, callback);
    }

    encontrarPorNumero(numero, callback) {
        const sql = 'SELECT * FROM SIM WHERE numero = ?';
        db.query(sql, [numero], callback);
    }

    listarPorUsuario(id_usuario, callback) {
        const sql = 'SELECT * FROM SIM WHERE id_usuario = ?';
        db.query(sql, [id_usuario], callback);
    }

    deletar(id_sim, callback) {
        const sql = 'DELETE FROM SIM WHERE id_sim = ?';
        db.query(sql, [id_sim], callback);
    }
}

module.exports = SimModel;
