import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';

import 'rxjs/add/operator/catch';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private users: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User>|Promise<User>|any {
    return this.users.getUser(route.params.id).catch(e => {
      throw new Error(e.message);
    });
  }
}
