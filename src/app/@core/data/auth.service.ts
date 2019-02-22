import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { NbAuthService, NbAuthToken } from "@nebular/auth";


@Injectable()
export class AuthService {
    private userSubj$: BehaviorSubject<User> = new BehaviorSubject<User>(<any>{});

    /**
     * Synchronous user field. Use this one when you're sure that the app has started
     */
    public user: User;

    /**
     * Async user field. Use this on app bootstrap
     */
    public get user$(): Observable<User> {
        return this.userSubj$.asObservable();
    }

    constructor(private nbAuth: NbAuthService) {

                    // Subscribe to token change
                    this.nbAuth.onTokenChange()
                        .subscribe((token: NbAuthToken) => {
                            if (token.isValid()) {
                                this.user = new User(token.getPayload().data);
                                this.userSubj$.next(this.user);
                            }
                        });
                }
}