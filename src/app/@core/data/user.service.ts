import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { IUsersResponse } from "../interfaces/users-response.interface";


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

    saveUser(user: User): Observable<any> {
        return this.http.post(`${this._baseUrl}/users`, user.apiObj)
            .pipe(
                map((response) => {
                    return response;
                })
            )
    }
}