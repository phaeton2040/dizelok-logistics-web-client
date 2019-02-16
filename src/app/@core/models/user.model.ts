import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
    firstName: string;
    lastName: string;
    email: string;

    constructor(source: IUser) {
        this.email = source.email;
        this.firstName = source.firstName;
        this.lastName = source.lastName;
    }

    public get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}