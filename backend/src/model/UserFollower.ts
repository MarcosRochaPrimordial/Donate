import * as mongoose from 'mongoose';

import { UserSchema } from './User';

export const UserFollowerSchema = new mongoose.Schema({
    userFollower: UserSchema,
    userFollowed: [UserSchema]
});

export const UserFollower = mongoose.model('UserFollower', UserFollowerSchema);
export default UserFollower;