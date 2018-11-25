import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
const env = require('./.env');

export function Authentication(req: Request, res: Response, next: NextFunction) {
    if(req.method === "OPTIONS") {
        next();
    } else {
        const token = req.headers['authorization'];

        if(!token) {
            return res.status(403).send({errors: ['Token não enviado.']});
        }

        jwt.verify(token, env.authSecret, (err, decoded) => {
            console.log(decoded);
            if(err) {
                return res.status(403).send({
                    errors: ['Não foi possível autenticar Token']
                });
            } else {
                next();
            }
        });
    }
}