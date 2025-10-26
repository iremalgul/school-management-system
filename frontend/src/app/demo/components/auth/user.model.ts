export class UserModel {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public isAdmin: boolean,
        public number?: string,
        public success?: boolean, // Optional
        public message? : string
    ) {}
}
