import { User } from './User';
import { handleErrorsFromDb } from './../config/DbHandles';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
const env = require('./../../.env');

export class UserModel {

    public login(user: any, callback: any) {
        let email = user.email;
        let password = user.password;
        User.findOne({ email }, (err: any, data: any) => {
            if(err) {
                handleErrorsFromDb(err, callback, 503);
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
                callback({ messages: ['Serviço indisponível'] }, 503);
            } else if(data) {
                callback({ messages: ['Email já cadastrado'] }, 403);
            } else {
                let salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);

                let newUser = new User(user);
                newUser.save(err => {
                    if(err) {
                        handleErrorsFromDb(err, callback, 403);
                    } else {
                        callback(user, 200);
                    }
                });
            }
        });
    }
}