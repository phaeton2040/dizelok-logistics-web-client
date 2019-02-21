import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    organisation_id: string;
    
    private _role: string;

    public static roleMappings = {
        'org-admin': 'Администратор',
        'manager': 'Менеджер',
        'driver': 'Водитель'
    }

    constructor(source: IUser) {
        this.email = source.email;
        this.firstName = source.firstName;
        this.lastName = source.lastName;
        this._role = source.role;
        this.organisation_id = source.organisation_id;
        this.username = source.username;
    }

    public get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public get role(): string {
        return User.roleMappings[this._role];
    }
}