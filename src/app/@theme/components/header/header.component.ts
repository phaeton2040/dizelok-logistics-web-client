import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { NbAuthToken } from '@nebular/auth';
import { User } from '../../../@core/models/user.model';
import { IUser } from '../../../@core/interfaces/user.interface';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/data/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = <IUser>{};

  userMenu = [{ title: 'Выйти', route: '/auth/logout' }];

  constructor(private router: Router,
              private menuService: NbMenuService,
              private nbMenuService: NbMenuService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$
          .subscribe((user: User) => {
            this.user = user;
          });
    this.nbMenuService.onItemClick()
        .pipe(
          filter(({ tag }) => {
            return tag === 'user-context-menu'
          })
        )
        .subscribe((menuItem: any) => {
          this.router.navigate([menuItem.item.route]);
        })
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
