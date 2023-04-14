
interface CreateUserDTOInterface {
    username : string
    principal : string
    credential : string
    birth : string | undefined
    gender : string | undefined
}

export class UserDTO implements CreateUserDTOInterface {
    username: string;
    principal: string;
    credential: string;
    gender: string | undefined;
    birth: string | undefined;
    constructor(username : string, email : string, password : string) {
        this.username = username;
        this.principal = email;
        this.credential = password
    }
}

