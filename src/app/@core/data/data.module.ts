import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateService } from './state.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserResolver } from './resolvers/user.resolver';
import { OrganisationService } from './organisation.service';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './resolvers/customer.resolver';

const SERVICES = [
  StateService,
  UserService,
  AuthService,
  OrganisationService,
  CustomerService,
  // Resolvers
  UserResolver,
  CustomerResolver
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
