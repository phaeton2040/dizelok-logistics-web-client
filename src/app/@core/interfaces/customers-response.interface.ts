import { ICustomer } from "./customer.interface";

export interface ICustomersResponse {
    total: string;
    page: number;
    perPage: number;
    lastPage: number;
    data: ICustomer[];
}