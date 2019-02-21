import { IUser } from "./user.interface";

export interface IUsersResponse {
    total: string;
    page: number;
    perPage: number;
    lastPage: number;
    data: IUser[];
}