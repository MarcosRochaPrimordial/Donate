import { handleErrorsFromDb } from '../config/DbHandles';
import User from './User';

export class StoryModel {
    getFeed(callback) {
        User.find({'Story.hospital': {'$exists': true}},
                  {'_id': 1, 'completeName': 1, 'Story': 1},
        (err, data) => {
            if(err) {
                console.log(err);
                handleErrorsFromDb(err, callback, 503);
            } else {
                callback(data, 200);
            }
        });
    }
}