import { UserController } from "./controller/User.controller";
import { connect } from './config/DbHandles';
import { StoryController } from "./controller/Story.controller";

connect();
new UserController();
new StoryController();