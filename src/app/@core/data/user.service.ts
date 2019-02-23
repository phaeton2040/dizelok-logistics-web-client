import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { IUsersResponse } from "../interfaces/users-response.interface";
import { IAPIResponse } from "../interfaces/api-response.interface";


@Injectable()
export class UserService {
    //TODO: remove hardcode
    private _baseUrl = 'http://localhost:3333';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get(`${this._baseUrl}/users`)
                   .pipe(
                       map((response: IUsersResponse) => response.data.map((item: IUser) => new User(item)))
                   );
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
}