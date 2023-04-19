
export class AuthDTO {
    principal : string
    credential : string

    constructor( principal : string, credential : string ) {
        this.principal = principal
        this.credential = credential
    }
}

export class CreateUserDTO extends AuthDTO {
    username : string
    constructor( username : string, principal : string, credential : string ) {
        super(principal, credential)
        this.username = username
    }
}


