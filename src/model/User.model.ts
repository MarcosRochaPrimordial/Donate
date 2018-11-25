import { User } from './User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
const env = require('./../../.env');

export class UserModel {

    public login(user: any, callback: any) {
        let email = user.email;
        let password = user.password;
        User.findOne({ email }, (err: any, data: any) => {
            if(err) {
                let errors = this.sendErrorsFromDB(err);
                callback({ errors }, 503);
            } else if(data && bcrypt.compareSync(password, data.password)) {
                let token = jwt.sign(data.toJSON(), env.authSecret, {
                    expiresIn: '7 day'
                });
                let { completeName, email } = data;
                callback({completeName, email, token}, 200);
            } else {
                callback({ errors: ['Usuário/Senha inválidos'] }, 403);
            }
        })
    }

    public signUp(user: any, callback: any) {
        let email = user.email;

        User.findOne({ email }, (err: any, data: any) => {
            if(err) {
                callback('Serviço indisponível', 503);
            } else if(data) {
                callback('Email já cadastrado', 403);
            } else {
                let salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);

                let newUser = new User(user);
                newUser.save(err => {
                    if(err) {
                        let errors = this.sendErrorsFromDB(err);
                        callback({ errors }, 403);
                    } else {
                        callback('Cadastrado com sucesso', 200);
                    }
                });
            }
        });
    }

    private sendErrorsFromDB(dbErrors): {} {
        const messages = [];
        _.forIn(dbErrors.errors, error => messages.push(error.message));
        return { messages };
    }
}