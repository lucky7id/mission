import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Promise from 'bluebird';

export default class AuthController {
    constructor (app, userService) {
        if (!app) throw new Error('AuthController expects the app obejct')

        this.userService = userService;
        this.secret = app.get('jwtSecret');
        this.getToken = Promise.coroutine(this.getToken).bind(this);
    }

    isValidPassword (userpass, hash) {
        return bcrypt.compareSync(userpass, hash);
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

    generateToken (payload) {
        return jwt.sign(payload, this.secret);
    }

    getCleanUser (user) {
        return _.without(user, 'password')
    }

    *getToken (req, res) {
        let user;

        if (!req.body.email || !req.body.password) {
            return res.json({error: 'Invalid Credentials'})
        }

        user = yield this.userService.getByEmail(req.body.email);

        if (!user || !this.isValidPassword(req.body.password, user.password)) {
            return res.json({error: 'Unable to authenticate user, invalid credentials'})
        }

        res.json({
            token: this.generateToken(this.getCleanUser(user))
        });
    }
}
