import { Component } from "@angular/core";
import { UserService } from "../../../@core/data/user.service";
import { User } from "../../../@core/models/user.model";


@Component({
    selector: 'ngx-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    public loaded = false;
    public users: User[];

    constructor(private userService: UserService) {
        this.userService.getUsers()
            .subscribe((users: User[]) => {
                this.loaded = true;
                this.users = users;
            })
    }
}