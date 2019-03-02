import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerListComponent } from './list/customer-list.component';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './form/customer-form.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule
  ],
  declarations: [
    CustomerFormComponent,
    CustomerListComponent
  ],
})
export class CustomersModule { }
