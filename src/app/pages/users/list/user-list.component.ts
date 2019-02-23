import { Component } from "@angular/core";
import { UserService } from "../../../@core/data/user.service";
import { User } from "../../../@core/models/user.model";
import { Router } from "@angular/router";


@Component({
    selector: 'ngx-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    public users: User[];
    public inProgress = false;

    constructor(private userService: UserService, private router: Router) {
        this.inProgress = true;
        this.userService.getUsers()
            .subscribe((users: User[]) => {
                this.inProgress = false;
                this.users = users;
            })
    }

    onUserClick(user) {
        this.router.navigate([`pages/users/${user.id}`])
    }
}