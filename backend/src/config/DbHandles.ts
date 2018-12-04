import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { MessageService } from '../service/Message.service';

const host: string = '127.0.0.1';
const port: number = 27017;
const database: string = 'donate_database';
const uri: string = `mongodb://${host}:${port}/${database}`;

export function connect() {
    mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
        if(err) {
            console.log(err.message);
        }
    });
}

export function handleErrorsFromDb(dbErrors, callback, status) {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    callback(MessageService.mssgReturn(errors), status);
}