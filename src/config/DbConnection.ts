import * as mongoose from 'mongoose';

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