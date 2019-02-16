import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './utils/auth.guard';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'http://localhost:3333',
        login: {
          endpoint: '/login',
        },
        logout: {
          alwaysFail: false,
          endpoint: '/logout',
          method: 'delete',
          redirect: {
            success: '/',
            failure: null,
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['You have been successfully logged out.'],
        },
        refreshToken: {
          endpoint: '/refresh-token',
          method: 'post',
          requireValidToken: false,
          redirect: {
            success: null,
            failure: null,
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['Your token has been successfully refreshed.'],
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token'
        }
      }),
    ],
    forms: {},
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NbAuthJWTInterceptor,
    multi: true
  },
  {
    // to bypass default nebular filter
    provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    useValue: function (data) { return false; }
  },
  AuthGuard,
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
