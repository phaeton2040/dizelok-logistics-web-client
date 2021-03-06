import { Component, OnDestroy } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { User } from "../../../@core/models/user.model";
import { AuthService } from "../../../@core/data/auth.service";
import { Subscription, empty } from "rxjs";
import { UserService } from "../../../@core/data/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { debounceTime, switchMap } from "rxjs/operators";
import { ConfirmComponent } from "../../../@theme/components/confirm/confirm.component";

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
    public buttonText: string;
    public title: string;

    private authSub: Subscription;
    private routeDataSub: Subscription;

    constructor(private auth: AuthService,
                private userSrv: UserService,
                private route: ActivatedRoute,
                private dialogService: NbDialogService,
                private router: Router) {
        this.authSub = this.auth.user$.subscribe(user => this.currentUser = user);
        this.routeDataSub = this.route.data.subscribe(({ user }) => {
            this.user = user || this.user;
            this.buttonText = this.user.email ? 'Обновить' : 'Добавить пользователя';
            this.title = this.user.email ? 'Редактировать пользователя' : 'Добавить пользователя';
            this.initForm();
        })
    }

    ngOnDestroy() {
        this.authSub.unsubscribe();
        this.routeDataSub.unsubscribe();
    }

    private initForm(): void {
        // TODO: add custom async validator for email to check if it's unique
        this.userForm = new FormGroup({
            firstName: new FormControl(this.user.firstName, Validators.required),
            lastName: new FormControl(this.user.lastName, Validators.required),
            email: new FormControl(this.user.email, { validators: [Validators.required, Validators.email], updateOn: 'blur'}),
            password: new FormControl(null, { validators: !this.user.email ? Validators.required : [] }),
            role: new FormControl(this.user._role, Validators.required)
        });
    }

    onSubmit() {
        if (this.userForm.valid) {
            this.inProgress = true;
            this.userSrv.saveUser(new User({
                ...this.userForm.value,
                id: this.user.id,
                organisationId: this.currentUser.organisationId
            })).subscribe(response => {
                this.inProgress = false;

                if (response.ok) {
                    this.router.navigate(['pages/users'])
                }
            })
        } else {
            Object.keys(this.userForm.controls).forEach(controlName => {
                this.userForm.controls[controlName].markAsDirty()
            });
        }
    }

    onDelete() {
        this.dialogService.open<ConfirmComponent>(ConfirmComponent, {
            context: <any>{
                title: `Вы хотите удалить пользователя ${this.user.name}?`
            }
        })
        .onClose
        .pipe(
            debounceTime(500),
            switchMap(proceedWithDelete => {
                return proceedWithDelete ? this.userSrv.deleteUser(this.user.id) : empty();
            })
        )
        .subscribe(result => {
            if (result) {
                this.router.navigate(['pages/users']);
            }
            console.log(result);
            this.inProgress = false;
        })
    }
}