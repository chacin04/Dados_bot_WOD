const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("bot.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS iniciativa (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            numero_iniciativa INT,
            iniciativa_base INT
        )`);
});

const insertarDatos = async (nombre, iniciativa, iniciativaBase) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO iniciativa (name, numero_iniciativa, iniciativa_base)
            VALUES (?, ?, ?)
            ON CONFLICT(name) DO UPDATE SET
            numero_iniciativa = excluded.numero_iniciativa,
            iniciativa_base = excluded.iniciativa_base`,
            [nombre, iniciativa, iniciativaBase],
            function (err) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        );
    });
};

const eliminarIniciativas = async () => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM iniciativa`, [], function (err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

const mostrarRegistros = async () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT name, numero_iniciativa
            FROM iniciativa
            ORDER BY numero_iniciativa DESC`,
            [],
            function (err, rows) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

const eliminarDeLista = async (nombre) => {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM iniciatica WHERE name = ?`,
            [nombre],
            function (err, rows) {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        );
    });
};

module.exports = {
    insertarDatos,
    eliminarDeLista,
    eliminarIniciativas,
    mostrarRegistros,
};
