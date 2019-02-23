import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserListComponent } from './list/user-list.component';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './form/user-form.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule
  ],
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
})
export class UsersModule { }
