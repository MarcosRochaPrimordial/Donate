import { Authentication } from './../config/Authentication';
import { Controller, Get, Post } from 'decorated-router';
import { Request, Response } from 'express';

import { StoryModel } from '../model/Story.model';

@Controller({ url: '/stories', auth: Authentication, cors: '*' })
export class StoryController {
    private _storyModel: StoryModel;

    constructor() {
        this._storyModel = new StoryModel();
    }

    @Get()
    getFeed(req: Request, res: Response) {
        this._storyModel.getFeed((response, status) => {
            res.status(status).json(response);
        });
    }

    @Post()
    createHistory(req: Request, res: Response) {
        this._storyModel.createHistory((response, status) => {
            res.status(status).json(response);
        });
    } 
}