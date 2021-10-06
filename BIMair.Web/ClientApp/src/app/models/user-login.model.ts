// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

export class UserLogin {
    constructor(userName?: string, password?: string, rememberMe?: boolean) {
        this.userName = userName;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    userName: string;
    password: string;
    rememberMe: boolean;
}
