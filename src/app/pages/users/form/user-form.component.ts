import { Component, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { User } from "../../../@core/models/user.model";
import { AuthService } from "../../../@core/data/auth.service";
import { Subscription } from "rxjs";
import { UserService } from "../../../@core/data/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnDestroy {
    public userForm: FormGroup;
    public user: User = new User(<any>{});
    public currentUser: User;
    public inProgress = false;

    private authSub: Subscription;

    constructor(private auth: AuthService,
                private userSrv: UserService,
                private router: Router) {
        this.initForm();
        this.authSub = this.auth.user$.subscribe(user => this.currentUser = user);
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
    }

    private initForm(): void {
        // TODO: add custom async validator for email to check if it's unique
        this.userForm = new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            email: new FormControl(this.user.email, { validators: [Validators.required, Validators.email], updateOn: 'blur'}),
            password: new FormControl(null, Validators.required),
            role: new FormControl(this.user.role, Validators.required)
        });
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.inProgress = true;
            this.userSrv.saveUser(new User({
                ...this.userForm.value, organisation_id: this.currentUser.organisation_id
            })).subscribe(response => {
                this.inProgress = false;

                if (response.ok) {
                    this.router.navigate(['pages/users'])
                }
            })
        } else {
            Object.keys(this.userForm.controls).forEach(controlName => {
                this.userForm.controls[controlName].markAsDirty()
            })
        }
    }
}