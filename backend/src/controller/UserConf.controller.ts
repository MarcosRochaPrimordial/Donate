import { Controller, Put } from 'decorated-router';
import { Request, Response } from 'express';

import { UserModel } from '../model/User.model';
import { Authentication } from '../config/Authentication';

@Controller({ url: '/userconf', auth: Authentication, cors: '*' })
export class UserConfController {

    private _userModel: UserModel;

    constructor() {
        this._userModel = new UserModel();
    }

    @Put('/changeuser')
    changeUser(req: Request, res: Response): void {
        this._userModel.changeUser(req.body, (response: any, status: number) => {
            res.status(status).json(response);
        });
    }

    @Put('/changepassword')
    changePassword(req: Request, res: Response): void {
        this._userModel.changePassword(req.body, (response: any, status: number) => {
            res.status(status).json(response);
        });
    }
}