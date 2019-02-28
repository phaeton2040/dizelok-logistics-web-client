import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CommonModule } from '@angular/common';
import { OrganisationSettingsComponent } from './settings/org-settings.component';
import { LoadingPointsComponent } from './loadingPoints/loading-points.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule
  ],
  declarations: [
    OrganisationSettingsComponent,
    LoadingPointsComponent
  ],
})
export class OrganisationModule { }
