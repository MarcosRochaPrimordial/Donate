import { User } from './User';
import { handleErrorsFromDb } from './../config/DbHandles';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../service/Token.service';
import { MessageService } from './../service/Message.service';

export class UserModel {

    private _tokenService: TokenService

    constructor() {
        this._tokenService = new TokenService();
    }

    public login(user: any, callback: any) {
        let email = user.email;
        let password = user.password;
        User.findOne({ email }, (err: any, data: any) => {
            if (err) {
                handleErrorsFromDb(err, callback, 503);
            } else if (data && bcrypt.compareSync(password, data.password)) {
                let token = this._tokenService.sign(data.toJSON(), '7 days');
                let { completeName, email } = data;
                callback({ completeName, email, token }, 200);
            } else {
                callback(MessageService.mssgReturn(['Usuário/Senha inválidos']), 403);
            }
        })
    }

    public signUp(user: any, callback: any) {
        let email = user.email;

        User.findOne({ email }, (err: any, data: any) => {
            if (err) {
                callback(MessageService.mssgReturn(['Serviço indisponível']), 503);
            } else if (data) {
                callback(MessageService.mssgReturn(['Email já cadastrado']), 403);
            } else {
                let salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);

                let newUser = new User(user);
                newUser.save(err => {
                    if (err) {
                        handleErrorsFromDb(err, callback, 403);
                    } else {
                        callback(user, 200);
                    }
                });
            }
        });
    }

    public changeUser(user: any, callback: any) {
        user.model.update({ _id: user._id }, {
            $set: {
                completeName: user.completeName,
                email: user.email, street: user.street, neighborhood: user.neighborhood,
                city: user.city, state: user.state, country: user.country, isDonor: user.isDonor,
                Story: user.Story
            }
        }).then(function (err) {
            if (err) {
                handleErrorsFromDb(err, callback, 503);
            } else {
                callback('sucess', 200);
            }
        })
    }


    public changePassword(user: any, callback: any) {
        let email = user.email;

        User.findOne({ email }, (err: any, data: any) => {
            if (err) {
                callback(MessageService.mssgReturn(['Serviço indisponível']), 503);
            } else if (data) {
                //Método de mudar senha
            } else {
                callback(MessageService.mssgReturn(['Usuário não encontrado']), 404);
            }
        });
    }

    public validateToken(token, callback): boolean | void {
        if(!this._tokenService.isExistToken(token)) {
            callback(MessageService.mssgReturn(['Token não enviado']), 403);
            return false;
        }

        this._tokenService.validateToken(token, (err, decoded) => {
            if(err) {
                callback(MessageService.mssgReturn(['Não foi possível autenticar o token.']), 403);
            } else {
                callback({ isValidated: true }, 200);
            }
        });
    }
}