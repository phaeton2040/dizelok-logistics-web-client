export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    organisationId: string;
    role: string;
    password?: string;

    _role: string;
    apiObj: any;
    name: string; // getter for fullname
}