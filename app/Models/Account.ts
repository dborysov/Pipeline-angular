export class Account {
    login: string;
    avatarUrl: string;
    gitUrl: string;
    email: string;
    
    constructor(login: string, avatarUrl: string, gitUrl: string, email: string) {
        this.login = login;
        this.avatarUrl = avatarUrl;
        this.gitUrl = gitUrl;
        this.email = email;
    }
}