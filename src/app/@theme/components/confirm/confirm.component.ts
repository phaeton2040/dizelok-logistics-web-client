import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm',
  styleUrls: ['./confirm.component.scss'],
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
    @Input()
    public title: string;

    constructor(public ref: NbDialogRef<ConfirmComponent>) {}
}
