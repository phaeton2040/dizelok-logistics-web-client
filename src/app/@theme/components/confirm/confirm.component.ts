import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm',
  styleUrls: ['./confirm.component.scss'],
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
    constructor(public ref: NbDialogRef<ConfirmComponent>) {}
}
