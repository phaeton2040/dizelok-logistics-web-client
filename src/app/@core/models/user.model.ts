import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    organisation_id: string; // kebab case for API compatibility
    password?: string;
    _role: string;

    public static roleMappings = {
        'org-admin': 'Администратор',
        'manager': 'Менеджер',
        'driver': 'Водитель'
    }

    constructor(source: IUser) {
        this.id = source.id;
        this.email = source.email;
        this.firstName = source.firstName;
        this.lastName = source.lastName;
        this._role = source.role;
        this.organisation_id = source.organisation_id;
        this.username = source.username;
        this.password = source.password;
    }

    public get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public get role(): string {
        return User.roleMappings[this._role];
    }

    public get apiObj(): any {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            username: this.email.split('@')[0],
            role: this._role,
            organisation_id: this.organisation_id,
            password: this.password
        }
    }
}