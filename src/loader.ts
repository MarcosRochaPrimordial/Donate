import { User } from "./controller/User.controller";
import { connect } from './config/DbConnection';

connect();
new User();