import Promise from 'bluebird';

const getByEmailQuery = `SELECT * FROM users WHERE email = ?`;
const getByIdQuery = `SELECT * FROM users WHERE id = ?`;
const getByUsernameQuery = `SELECT * FROM users WHERE username = ?`;

export default class UserService {
    constructor (db) {
        this.db = db;
    }

    getByEmail (email) {
        return this.baseQuery(email);
    }

    getById (id) {
        return this.baseQuery(getByIdQuery, id);
    }

    getByUsername (username) {
        return this.baseQuery(getByUsernameQuery, username);
    }

    baseQuery (query, val) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if (err) {
                    res.json({
                        error: 'Unable to establish connection to the database'
                    });
                }

                connection.query(query, [val], (err, rows, fields) => {
                    if (err || !rows.length) return reject(err);

                    resolve(rows[0]);
                });
            });
        });
    }
}