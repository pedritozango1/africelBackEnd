const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'africel'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL com sucesso!');
});

module.exports = db;
