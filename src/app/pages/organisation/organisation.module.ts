import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { OrganisationSettingsComponent } from './settings/org-settings.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule
  ],
  declarations: [
    OrganisationSettingsComponent
  ],
})
export class OrganisationModule { }
