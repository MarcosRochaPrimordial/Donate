import { Controller, Post, Get } from 'decorated-router';
import { Request, Response } from 'express';

import { UserModel } from './../model/User.model';

@Controller({url: '/user', cors: '*'})
export class UserController {

    private _userModel: UserModel;

    constructor() {
        this._userModel = new UserModel();
    }
    
    @Get('/login')
    doLogin(req: Request, res: Response): void {
        this._userModel.login(req.body, (response: any, status: number) => {
           res.status(status).json(response);
        });
    }

    @Post('/cadastro')
    signUp(req: Request, res: Response): void {
        this._userModel.signUp(req.body, (response: any, status: number) => {
            res.status(status).json(response);
        });
    }

    @Post('/alterarusuario')
    changeUser(req: Request, res: Response): void {
        this._userModel.changeUser(req.body, (response: any, status: number) => {
            res.status(status).json(response);
        });
    }

    @Post('/alterarsenha')
    changePassword(req: Request, res: Response): void {
        this._userModel.changePassword(req.body, (response: any, status: number) => {
            res.status(status).json(response);
        });
    }
}