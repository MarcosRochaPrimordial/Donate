import { UserService } from "../service/User.service";

import { User } from "./User";
import { handleErrorsFromDb } from "./../config/DbHandles";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "bson";
import UserFollower from './UserFollower';

export class UserFollowerModel {
  public followUser(body, callback) {
    let user = UserService.getInstance().getUser();
    let loggedUser_id: ObjectId = user._id;
    let followedUser_id: ObjectId = body._id;

    UserFollower.findOne({loggedUser_id}, (err: any, data: any) => {
        if (err) {
            handleErrorsFromDb(err, callback, 503);
        } else {
            UserFollower.update({ _id: loggedUser_id}, {
                $set: {
                    userFollowed: data.userFollowed.push(followedUser_id)
                }
            }).then(function (err) {
                if (err) {
                    handleErrorsFromDb(err, callback, 503);
                } else {
                    callback('sucess', 503);
                }
            });
        }
    });
  }
}
