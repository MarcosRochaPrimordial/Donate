import { Controller } from 'decorated-router';
import { Authentication } from './../config/Authentication';

@Controller({url: '/feed', cors: '*', auth: Authentication})
export class FeedController {
    
}