import { handleErrorsFromDb } from '../config/DbHandles';

import { UserService } from '../service/User.service';
import User from './User';

export class StoryModel {
    public getFeed(callback) {
        User.find(this.calculateProximity(),
                  {'_id': 1, 'completeName': 1, email: 1, 'Story': 1},
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
                {
                    'Story.presentationText': {'$exists': true}
                },
                {
                    '$or': [
                        {
                            '$and': [
                                {'street': user.street}, {'neighborhood': user.neighborhood}
                            ]
                        },
                        {'city': user.city}, {'state': user.state}, {'country': user.country}
                    ]
                }
            ]
        };
    }
}