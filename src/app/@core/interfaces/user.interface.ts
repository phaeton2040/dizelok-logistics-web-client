export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    organisation_id: string;
    role: string;
    password?: string;

    name: string; // getter for fullname
}