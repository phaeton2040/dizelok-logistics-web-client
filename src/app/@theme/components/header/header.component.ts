import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { User } from '../../../@core/models/user.model';
import { IUser } from '../../../@core/interfaces/user.interface';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any = <IUser>{};

  userMenu = [{ title: 'Выйти', route: '/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private menuService: NbMenuService,
              private nbMenuService: NbMenuService,
              private authService: NbAuthService) {}

  ngOnInit() {
    this.authService.onTokenChange()
          .subscribe((token: NbAuthToken) => {
            if (token.isValid()) {
              this.user = new User(token.getPayload().data);
            }
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

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
