import { Component } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { User } from "../../../@core/models/user.model";

@Component({
    selector: 'ngx-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
    public userForm: FormGroup;
    public user: User = new User(<any>{});

    constructor() {
        this.initForm();
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
        console.log(this.userForm.value);
    }
}