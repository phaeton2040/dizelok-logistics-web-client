import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateService } from './state.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserResolver } from './resolvers/user.resolver';

const SERVICES = [
  StateService,
  UserService,
  AuthService,

  // Resolvers
  UserResolver
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
