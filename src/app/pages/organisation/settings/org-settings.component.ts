import { Component, OnDestroy } from "@angular/core";
import { OrganisationService } from "../../../@core/data/organisation.service";
import { Organisation } from "../../../@core/models/organisation.model";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IAPIResponse } from "../../../@core/interfaces/api-response.interface";


@Component({
    selector: 'org-settings',
    templateUrl: './org-settings.component.html',
    styleUrls: ['./org-settings.component.scss']
})
export class OrganisationSettingsComponent implements OnDestroy {
    public organisation: Organisation = <any>{};
    public organisationForm: FormGroup;
    public inProgress = false;

    private orgSubscription: Subscription;

    constructor(private orgService: OrganisationService) {
        this.orgSubscription = this.orgService.organisation$
            .subscribe((organisation: Organisation) => {
                this.organisation = organisation;
                this.initForm();
            });
    }

    ngOnDestroy() {
        this.orgSubscription.unsubscribe();
    }

    private initForm(): void {
        // TODO: add custom async validator for email to check if it's unique
        this.organisationForm = new FormGroup({
            name: new FormControl(this.organisation.name, Validators.required),
            phone: new FormControl(this.organisation.phone, Validators.required),
            primaryEmail: new FormControl(this.organisation.primaryEmail, { validators: [Validators.required, Validators.email], updateOn: 'blur'}),
            id: new FormControl(this.organisation.id, { validators: Validators.required })
        });
    }

    onSubmit() {
        this.inProgress = true;

        // TODO: unsubscribe or use first
        if (this.organisationForm.valid) {
            this.orgService.saveSettings(new Organisation(this.organisationForm.value))
                .subscribe((response: IAPIResponse) => {
                    if (response.ok) {
                        this.orgService.getOrganisation();
                    }

                    this.inProgress = false;
                })
        } else {
            Object.keys(this.organisationForm.controls).forEach(controlName => {
                this.organisationForm.controls[controlName].markAsDirty()
            });
        }
    }
}