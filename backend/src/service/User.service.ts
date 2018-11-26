export class UserService {

    private static _instance: UserService = null;
    private user: Object = null;

    constructor() {
        UserService._instance = this;
    }
    
    public static getInstance() {
        if(UserService._instance === null) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }

    public getUser(): any {
        return this.user;
    }

    public setUser(user: Object) {
        this.user = user;
    }
}