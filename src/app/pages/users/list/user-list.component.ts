import { Component, OnDestroy } from "@angular/core";
import { UserService } from "../../../@core/data/user.service";
import { User } from "../../../@core/models/user.model";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Subscription, empty } from "rxjs";
import { switchMap, debounceTime } from "rxjs/operators";
import { AuthService } from "../../../@core/data/auth.service";
import { ConfirmComponent } from "../../../@theme/components/confirm/confirm.component";


@Component({
    selector: 'ngx-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {
    public users: User[];
    public currentUser: User;
    public inProgress = false;

    private userListSub: Subscription;
    private authSub: Subscription;

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private dialogService: NbDialogService) {
        this.inProgress = true;
        this.userService.getUsers();
        this.userListSub = this.userService.userList$.subscribe((users: User[]) => {
            this.inProgress = false;
            this.users = users;
        });
        this.authSub = this.authService.user$.subscribe(user => this.currentUser = user);
    }

    ngOnDestroy() {
        this.userListSub.unsubscribe();
        this.authSub.unsubscribe();
    }

    onUserClick(user) {
        this.router.navigate([`pages/users/${user.id}`])
    }

    onDeleteUser(event, user: User) {
        event.stopPropagation();
        this.dialogService.open(ConfirmComponent, { context: <any>{ title: `Вы хотите удалить пользователя ${user.name}` } })
            .onClose.pipe(
                debounceTime(500),
                switchMap(proceedWithResult => {
                    return proceedWithResult ?
                        this.userService.deleteUser(user.id) : empty();
                })
            )
            .subscribe(() => this.userService.getUsers())
    }
}