import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { NbAuthToken } from '@nebular/auth';
import { User } from '../../../@core/models/user.model';
import { IUser } from '../../../@core/interfaces/user.interface';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/data/auth.service';
import { OrganisationService } from '../../../@core/data/organisation.service';
import { Organisation } from '../../../@core/models/organisation.model';
import { IOrganisation } from '../../../@core/interfaces/organisation.interface';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: User = <IUser>{};
  organisation: Organisation = <IOrganisation>{};

  userMenu = [{ title: 'Выйти', route: '/auth/logout' }];

  constructor(private router: Router,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private nbMenuService: NbMenuService,
              private authService: AuthService,
              private orgService: OrganisationService) {}

  ngOnInit() {
    this.orgService.organisation$
        .subscribe((organisation: Organisation) => this.organisation = organisation);
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

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }
}
