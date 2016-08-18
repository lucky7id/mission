import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default class AuthController {
    constructor (app) {
        if (!app) throw new Error('AuthController expects the app obejct')
        this.secret = app.get('jwtSecret');
    }

    isValidPassword (userpass, hash) {
        return bcrypt.compareSync(userpass, hash);
    }

    isValidToken (token) {
        const decoded = jwt.decode(token, this.secret);

        console.log(decoded);
        return decoded;
    }

    generateToken (payload) {
        return jwt.sign(payload, this.secret);
    }

    getCleanUser (user) {
        return _.without(user, 'password')
    }
}


AuthController.prototype.getToken = Promise.coroutine(function *(req, res) {
    let user = yield this.userService.getByEmail(req.body.email);

    if (!this.isValidPassword(req.body.password, user[0].password)) {
        res.json({error: 'Unable to authenticate user, invalid credentials'})
    }

    res.json({
        token: this.generateToken(getCleanUser(user))
    });
});
