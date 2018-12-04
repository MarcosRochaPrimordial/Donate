import { Request, Response, NextFunction } from "express";

import { UserService } from './../service/User.service';
import { TokenService } from './../service/Token.service';

export function Authentication(req: Request, res: Response, next: NextFunction) {
    if(req.method === "OPTIONS") {
        next();
    } else {
        const token = req.headers['authorization'];
        let tokenService = new TokenService();

        if(!tokenService.isExistToken(token)) {
            return res.status(403).send({errors: ['Token não enviado.']});
        }

        let userService = UserService.getInstance();
        tokenService.validateToken(token, (err, decoded) => {
            if(err) {
                userService.cleanUser();
                return res.status(403).send({
                    errors: ['Não foi possível autenticar Token']
                });
            } else {
                userService.setUser(decoded);
                next();
            }
        });
    }
}