import { Component, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { User } from "../../../@core/models/user.model";
import { AuthService } from "../../../@core/data/auth.service";
import { Subscription, empty } from "rxjs";
import { UserService } from "../../../@core/data/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { debounceTime, switchMap, take } from "rxjs/operators";
import { ConfirmComponent } from "../../../@theme/components/confirm/confirm.component";
import { Customer } from "../../../@core/models/customer.model";
import { CustomerService } from "../../../@core/data/customer.service";
import { IAPIResponse } from "../../../@core/interfaces/api-response.interface";

@Component({
    selector: 'ngx-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnDestroy {
    public customerForm: FormGroup;
    public contacts: FormGroup[];
    public deliveryPoints: FormGroup[];
    public customer: Customer = new Customer(<any>{});
    public currentUser: User;
    public inProgress = false;
    public buttonText: string;
    public title: string;
    public isDeletingPoint = false;

    private authSub: Subscription;
    private routeDataSub: Subscription;

    constructor(private auth: AuthService,
                private customerSrv: CustomerService,
                private route: ActivatedRoute,
                private dialogService: NbDialogService,
                private router: Router) {
        this.authSub = this.auth.user$.subscribe(user => this.currentUser = user);
        this.routeDataSub = this.route.data.subscribe(({ customer }) => {
            this.customer = customer || this.customer;
            this.buttonText = this.customer.id ? 'Обновить' : 'Добавить клиента';
            this.title = this.customer.id ? 'Редактировать клиента' : 'Добавить клиента';
            this.initForm();
        })
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
        this.routeDataSub.unsubscribe();
    }

    private initForm(): void {
        const contacts: FormGroup[] = this.customer.contacts ? this.customer.contacts.map(contact => {
            return new FormGroup({
              name: new FormControl(contact.name, Validators.required),
              phone: new FormControl(contact.phone, Validators.required),
              email: new FormControl(contact.email, [Validators.required, Validators.email])
            });
          }) : [new FormGroup({
            name: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email])
          })];
        const deliveryPoints: FormGroup[] = this.customer.deliveryPoints ? this.customer.deliveryPoints.map(point => {
            return new FormGroup({
              id: new FormControl(point.id, Validators.required),
              name: new FormControl(point.name, Validators.required),
              address: new FormControl(point.address, Validators.required),
              customerId: new FormControl(point.customerId, Validators.required)
            });
          }) : [new FormGroup({
            name: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required)
          })];

        this.customerForm = new FormGroup({
            name: new FormControl(this.customer.name, Validators.required),
            contacts: new FormArray(contacts),
            deliveryPoints: new FormArray(deliveryPoints)
        });
        this.contacts = <FormGroup[]>(this.customerForm.controls.contacts as FormArray).controls;
        this.deliveryPoints = <FormGroup[]>(this.customerForm.controls.deliveryPoints as FormArray).controls;
    }

    onSubmit() {
        if (this.customerForm.valid) {
            this.inProgress = true;
            this.customerSrv.saveCustomer(new Customer({
                ...this.customerForm.value,
                id: this.customer.id,
                organisationId: this.currentUser.organisationId
            })).subscribe(response => {
                this.inProgress = false;

                if (response.ok) {
                    this.router.navigate(['pages/customers'])
                }
            })
        } else {
            Object.keys(this.customerForm.controls).forEach(controlName => {
                this.customerForm.controls[controlName].markAsDirty();
            });

            const pointArray: FormArray = this.customerForm.controls.deliveryPoints as FormArray;
            const pointControls: FormGroup[] = <FormGroup[]>pointArray.controls;
            pointControls.forEach(point => {
                point.controls.name.markAsDirty();
                point.controls.address.markAsDirty();
            });

            const contactArray: FormArray = this.customerForm.controls.contacts as FormArray;
            const contactControls: FormGroup[] = <FormGroup[]>contactArray.controls;
            contactControls.forEach(contact => {
                Object.keys(contact.controls).forEach(controlName => {
                    contact.controls[controlName].markAsDirty();
                });
            });
        }
    }

    onDelete() {
        this.dialogService.open<ConfirmComponent>(ConfirmComponent, {
            context: <any>{
                title: `Вы хотите удалить клиента ${this.customer.name}?`
            }
        })
        .onClose
        .pipe(
            debounceTime(500),
            switchMap(proceedWithDelete => {
                return proceedWithDelete ? this.customerSrv.deleteCustomer(this.customer.id) : empty();
            })
        )
        .subscribe(result => {
            if (result) {
                this.router.navigate(['pages/customers']);
            }
            this.inProgress = false;
        })
    }

    onAddContact(): void {
        const contactControl = new FormGroup({
          name: new FormControl(null, Validators.required),
          phone: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email])
        });
    
        const contacts: FormArray = <FormArray>this.customerForm.controls.contacts;
    
        contacts.push(contactControl);
    }

    removeLastContact() {
        const contactsArray: FormArray = this.customerForm.controls.contacts as FormArray;
        const contactsCount = contactsArray.controls.length;
    
        contactsArray.removeAt(contactsCount - 1);
    }

    addDeliveryPoint(): void {
        const pointControl = new FormGroup({
          name: new FormControl(null, Validators.required),
          address: new FormControl(null, Validators.required)
        });
    
        const points: FormArray = <FormArray>this.customerForm.controls.deliveryPoints;
    
        points.push(pointControl);
    }
    
    removeLastPoint() {
        const pointArray: FormArray = this.customerForm.controls.deliveryPoints as FormArray;
        const pointsCount = pointArray.controls.length;
        const currentForm = pointArray.at(pointsCount - 1); 
        
        // TODO: need an asynchronous check for current deliveries associated with the delivery point that is being removed
        if (!currentForm.value.id) {
            pointArray.removeAt(pointsCount - 1);
        } else {
            this.isDeletingPoint = true;
            this.customerSrv.deleteDeliveryPoint(currentForm.value.id)
                .pipe(
                    take(1)
                )
                .subscribe((response: IAPIResponse) => {
                    if (response.ok) {
                        pointArray.removeAt(pointsCount - 1);
                    }

                    this.isDeletingPoint = true;
                });
        }
    }
}