import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Customer } from "../models/customer.model";
import { ICustomersResponse } from "../interfaces/customers-response.interface";
import { IAPIResponse } from "../interfaces/api-response.interface";
import { ICustomer } from "../interfaces/customer.interface";
import { environment } from "../../../environments/environment";


@Injectable()
export class CustomerService {
    private _baseUrl = environment.baseUrl;
    private customerListSubj = new BehaviorSubject<Customer[]>([]);

    public get customerList$() {
        return this.customerListSubj.asObservable();
    } 

    constructor(private http: HttpClient) {}

    getCustomers(): void {
        this.http.get(`${this._baseUrl}/customers`)
                .subscribe((response: ICustomersResponse) => {
                    const users = response.data.map((item: ICustomer) => new Customer(item));
                    
                    this.customerListSubj.next(users);
                });
    }

    getCustomer(id: number): Observable<Customer> {
        return this.http.get(`${this._baseUrl}/customers/${id}`)
                   .pipe(
                       map((response: IAPIResponse) => new Customer(response.customer))
                   );
    }

    saveCustomer(customer: Customer): Observable<IAPIResponse> {
        const url: string = customer.id ? `${this._baseUrl}/customers/${customer.id}` : `${this._baseUrl}/customers`;

        return this.http.post(url, customer.apiObj)
            .pipe(
                map((response: IAPIResponse) => {
                    return response;
                })
            )
    }

    deleteCustomer(id): Observable<IAPIResponse> {
        const url: string = `${this._baseUrl}/customers/${id}`;

        return this.http.delete(url)
            .pipe(
                map((response: IAPIResponse) => {
                    return response;
                })
            )
    }

    deleteDeliveryPoint(id): Observable<IAPIResponse> {
        const url: string = `${this._baseUrl}/customers/delivery-point/${id}`;

        return this.http.delete(url)
            .pipe(
                map((response: IAPIResponse) => {
                    return response;
                })
            )
    }
}