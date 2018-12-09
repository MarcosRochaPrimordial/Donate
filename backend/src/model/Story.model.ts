import { handleErrorsFromDb } from '../config/DbHandles';

import { UserService } from '../service/User.service';
import User from './User';
import { ObjectId } from 'bson';
import * as mongoose from 'mongoose';

export class StoryModel {
    public getFeed(callback) {
        User.find(this.calculateProximity(),
            { '_id': 1, 'completeName': 1, 'email': 1, 'Story': 1 },
            (err, data) => {
                if (err) {
                    handleErrorsFromDb(err, callback, 503);
                } else {
                    callback(data, 200);
                }
            });
    }

    public getOwnStory(callback) {
        let user_id = mongoose.Types.ObjectId(UserService.getInstance().getUser()._id);
        User.findOne({'_id': user_id},
                {'Story.presentationText': 1},
                (err, data) => {
                    if(err) {
                        handleErrorsFromDb(err, callback, 503);
                    } else {
                        callback(data, 200);
                    }
                });
    }

    private calculateProximity() {
        let user = UserService.getInstance().getUser();
        return {
            '$and': [
                { 'bloodType': user.bloodType },
                { 'country': user.country },
                { 'state': user.state },
                {
                    'Story.presentationText': { '$exists': true }
                },
                {
                    '$or': [
                        {
                            '$and': [
                                { 'street': user.street }, { 'neighborhood': user.neighborhood }
                            ]
                        },
                        { 'city': user.city },
                        { 'state': user.state }
                    ]
                }
            ]
        };
    }

    public createStory(body, callback) {
        let user = UserService.getInstance().getUser();
        let user_id: ObjectId = mongoose.Types.ObjectId(user._id);

        User.updateOne({'_id': user_id}, {
           '$set': {
                'Story.presentationText': body.presentationText
            }
        }, (err, data) => {
            if(err) {
                handleErrorsFromDb(err, callback, 503);
            } else {
                callback('sucess', 200);
            }
        });
    }
}