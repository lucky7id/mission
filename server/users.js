import Promise from 'bluebird';
import * as _ from 'lodash';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import validator from 'email-validator';

const isUniqueEmailQuery = `SELECT * FROM  users WHERE email = ?;`;
const createUserQuery = `
    INSERT INTO users(
        email,
        firstname,
        lastname,
        password,
        role,
        status
    )
    VALUES(?, ?, ?, ?, ?, ?);
`;

export default class JobsController {
    constructor (app, db, userService, mailer) {
        this.db = db;
        this.secret = app.get('jwtSecret');
        this.regSecret = app.get('regSecret');
        this.userService = userService;
        this.mailer = mailer;
        this.registerUser = Promise.coroutine(this.registerUser).bind(this);
    }

    verifyToken (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                    return false;
                }

                resolve(decoded);
            });
        });
    }

    getRegToken (req, res, email) {
        return this.checkForExistingEmail(email)
            .then(() => {
                return jwt.sign({email}, this.secret);
            })
            .catch(err => {
                res.json({error: "Email already exists"});
            })
    }

    handleNewUser (req, res) {
        const email = req.body.email;
        const isValidEmail = validator.validate(email);
        const secret = req.body.secret;

        if (!isValidEmail) return res.json({error: 'Not a valid email'});
        if (!secret || secret !== this.regSecret) {
            return reg.json({error: "Not Authorized"})
        }

        this.getRegToken(req, res, email)
            .then(token => {
                this.mailer.sendMail({
                    to: email,
                    from: 'no-reply@mission.io',
                    subject: `You've been invited to Mission.io`,
                    text:  `Set your password at http://yukine.me/mission/signup/${token}`,
                    html: `<a href="http://yukine.me/mission/signup/${token}">Click here</a> to register`
                });
            });
    }

    checkForExistingEmail (email) {
        return new Promise((resolve, reject) => {
            this.db.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(isUniqueEmailQuery, [email], (err, rows, fields) => {
                    if (err) return reject(err);
                    if (rows.length) return reject();

                    resolve();
                });
            });
        });
    }

    getUserValues (user) {
        const validKeys = ['firstname', 'lastname', 'password'];

        let vals = [];

        for (let key of validKeys) {
            const val = user[key];

            if (typeof val === 'undefined') return false;

            if (key === 'password') {
                vals.push(bcrypt.hashSync(val));
                continue;
            }

            vals.push(val);
        }

        return vals;
    }

    createUser (req, res, vals) {
        return new Promise((resolve, reject) => {
            this.db.getConnection((err, connection) => {
                if (err) {
                    res.json({
                        error: 'Unable to establish connection to the database'
                    });
                    return reject();
                }

                connection.query(createUserQuery, vals, (err, rows, fields) => {
                    if (err) {
                        res.json({success: false, error: err});
                        connection.release();
                        return reject();
                    }

                    connection.release();
                    res.json({success: true});
                    resolve();
                });
            })
        })
    }

    *registerUser (req, res) {
        let payload = yield this.verifyToken(req.params.token);
        let vals = getUserValues(req.body);

        if (!vals) return res.json({error: 'Required fields missing'});

        if (!payload.email) {
            return res.json({error: 'Registration token is invalid'})
        }

        vals = [payload.email, ...vals, 'admin', 'active'];

        yield this.createUser(req, res, vals);
    }
}
