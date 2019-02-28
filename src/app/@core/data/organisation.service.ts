import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { IUsersResponse } from "../interfaces/users-response.interface";
import { IAPIResponse } from "../interfaces/api-response.interface";
import { Organisation } from "../models/organisation.model";


@Injectable()
export class OrganisationService {
    //TODO: remove hardcode
    private _baseUrl = 'http://localhost:3333';
    private organisationSubj = new BehaviorSubject<Organisation>(<any>{});
    private loadingPointsSubj = new BehaviorSubject<any>({});

    public get organisation$(): Observable<Organisation> {
        return this.organisationSubj.asObservable();
    } 

    constructor(private http: HttpClient) {
        this.getOrganisation();
    }

    getOrganisation(): void {
        this.http.get(`${this._baseUrl}/organisation/current`)
            .subscribe((response: IAPIResponse) => {                   
                this.organisationSubj.next(new Organisation(response.organisation));
            });
    }

    saveSettings(organisation: Organisation): Observable<IAPIResponse> {
        return this.http.post(`${this._baseUrl}/organisation`, organisation.apiObj)
                .pipe(
                    map((response: IAPIResponse) => response)
                )
    }
    
    getLoadingPoints(): void {

    }
}