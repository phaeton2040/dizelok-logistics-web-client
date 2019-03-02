import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../../models/customer.model';

import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerResolver implements Resolve<Customer> {
  constructor(private customerSrv: CustomerService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Customer>|Promise<Customer>|any {
    return this.customerSrv.getCustomer(route.params.id).catch(e => {
      throw new Error(e.message);
    });
  }
}
