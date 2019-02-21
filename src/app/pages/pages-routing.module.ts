import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/list/user-list.component';
import { UserFormComponent } from './users/form/user-form.component';

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
      // component: UserListComponent,
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
          path: '',
          redirectTo: 'users',
          pathMatch: 'full',
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
export class PagesRoutingModule {
}
