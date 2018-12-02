import { Controller, Put } from 'decorated-router';
import { Request, Response } from 'express';

import { UserModel } from '../model/User.model';
import { Authentication } from '../config/Authentication';
import { UserFollowerModel } from '../model/UserFollower.model';

@Controller({ url: '/userconf', auth: Authentication, cors: '*' })
export class UserConfController {

    private _userModel: UserModel;
    private _userFollowerModel: UserFollowerModel;

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

    @Put('/followuser')
    followUser(req: Request, res: Response): void {
        this._userFollowerModel.followUser(req.body, (response: any, status: any) => {
            res.status(status).json(response);
        });
    }
}