import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { IUsersResponse } from "../interfaces/users-response.interface";
import { IAPIResponse } from "../interfaces/api-response.interface";
import { environment } from '../../../environments/environment';


@Injectable()
export class UserService {
    private _baseUrl = environment.baseUrl;
    private userListSubj = new BehaviorSubject<User[]>([]);

    public get userList$() {
        return this.userListSubj.asObservable();
    } 

    constructor(private http: HttpClient) {}

    getUsers(): void {
        this.http.get(`${this._baseUrl}/users`)
                .subscribe((response: IUsersResponse) => {
                    const users = response.data.map((item: IUser) => new User(item));
                    
                    this.userListSubj.next(users);
                });
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`${this._baseUrl}/users/${id}`)
                   .pipe(
                       map((response: IAPIResponse) => new User(response.user))
                   );
    }

    saveUser(user: User): Observable<IAPIResponse> {
        const url: string = user.id ? `${this._baseUrl}/users/${user.id}` : `${this._baseUrl}/users`;

        return this.http.post(url, user.apiObj)
            .pipe(
                map((response: IAPIResponse) => {
                    return response;
                })
            )
    }

    deleteUser(id): Observable<IAPIResponse> {
        const url: string = `${this._baseUrl}/users/${id}`;

        return this.http.delete(url)
            .pipe(
                map((response: IAPIResponse) => {
                    return response;
                })
            )
    }
}