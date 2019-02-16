import { Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private nbAuthService: NbAuthService) {}

}
