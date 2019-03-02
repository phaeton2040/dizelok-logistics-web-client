import { Component, OnDestroy } from "@angular/core";
import { CustomerService } from "../../../@core/data/customer.service";
import { Customer } from "../../../@core/models/customer.model";
import { User } from "../../../@core/models/user.model";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Subscription, empty } from "rxjs";
import { switchMap, debounceTime } from "rxjs/operators";
import { AuthService } from "../../../@core/data/auth.service";
import { ConfirmComponent } from "../../../@theme/components/confirm/confirm.component";


@Component({
    selector: 'ngx-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnDestroy {
    public customers: Customer[];
    public currentUser: User;
    public inProgress = false;

    private customerListSub: Subscription;
    private authSub: Subscription;

    constructor(private customerService: CustomerService,
                private authService: AuthService,
                private router: Router,
                private dialogService: NbDialogService) {
        this.inProgress = true;
        this.customerService.getCustomers();
        this.customerListSub = this.customerService.customerList$.subscribe((customers: Customer[]) => {
            this.inProgress = false;
            this.customers = customers;
        });
        this.authSub = this.authService.user$.subscribe(user => this.currentUser = user);
    }

    ngOnDestroy() {
        this.customerListSub.unsubscribe();
        this.authSub.unsubscribe();
    }

    onCustomerClick(customer) {
        this.router.navigate([`pages/customers/${customer.id}`])
    }

    onDeleteCustomer(event, customer: Customer) {
        event.stopPropagation();
        this.dialogService.open(ConfirmComponent, { context: <any>{ title: `Вы хотите удалить клиента ${customer.name}` } })
            .onClose.pipe(
                debounceTime(500),
                switchMap(proceedWithResult => {
                    return proceedWithResult ?
                        this.customerService.deleteCustomer(customer.id) : empty();
                })
            )
            .subscribe(() => this.customerService.getCustomers())
    }
}