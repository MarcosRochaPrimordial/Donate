import * as jwt from 'jsonwebtoken';
const env = require('./../../.env');

export class TokenService {

    public validateToken(token: string, callback) {
        jwt.verify(token, env.authSecret, callback);
    }

    public isExistToken(token: string) {
        return token !== null && token !== undefined;
    }

    public sign(data: any, expiration: string) {
        return jwt.sign(data, env.authSecret, {expiresIn: expiration});
    }
}