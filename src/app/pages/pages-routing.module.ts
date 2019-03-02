import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/list/user-list.component';
import { UserFormComponent } from './users/form/user-form.component';
import { UserResolver } from '../@core/data/resolvers/user.resolver';
import { OrganisationSettingsComponent } from './organisation/settings/org-settings.component';
import { LoadingPointsComponent } from './organisation/loadingPoints/loading-points.component';
import { CustomerFormComponent } from './customers/form/customer-form.component';
import { CustomerResolver } from '../@core/data/resolvers/customer.resolver';
import { CustomerListComponent } from './customers/list/customer-list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'users',
      children: [
        {
          path: '',
          component: UserListComponent
        },
        {
          path: 'add',
          component: UserFormComponent
        },
        {
          path: ':id',
          component: UserFormComponent,
          resolve: { user: UserResolver }
        },
        {
          path: '',
          redirectTo: 'users',
          pathMatch: 'full',
        }
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: '',
          component: CustomerListComponent
        },
        {
          path: 'add',
          component: CustomerFormComponent
        },
        {
          path: ':id',
          component: CustomerFormComponent,
          resolve: { customer: CustomerResolver }
        },
        {
          path: '',
          redirectTo: 'customers',
          pathMatch: 'full',
        }
      ]
    },
    {
      path: 'organisation',
      children: [
        {
          path: '',
          redirectTo: '/pages/organisation/settings',
          pathMatch: 'full'
        },
        {
          path: 'settings',
          component: OrganisationSettingsComponent
        },
        {
          path: 'loading-points',
          component: LoadingPointsComponent
        }
      ]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
