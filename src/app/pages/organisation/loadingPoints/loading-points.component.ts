import { Component } from "@angular/core";
import { OrganisationService } from "../../../@core/data/organisation.service";
import { LoadingPoint } from "../../../@core/models/loading-point.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IAPIResponse } from "../../../@core/interfaces/api-response.interface";


@Component({
    selector: 'loading-points',
    templateUrl: './loading-points.component.html',
    styleUrls: ['./loading-points.component.scss']
})
export class LoadingPointsComponent {
 
    public loadingPoints: LoadingPoint[];
    public loadingPointForm: FormGroup;
    public inProgress = false;

    constructor(private orgService: OrganisationService) {
        this.orgService.getLoadingPoints();
        this.orgService.loadingPoints$
            .subscribe(lps => {
                this.loadingPoints = lps;
                this.initForm();
            });
    }

    private initForm(): void {
        this.loadingPointForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        if (this.loadingPointForm.valid) {
            this.inProgress = true;
            this.orgService.saveLoadingPoint(new LoadingPoint(this.loadingPointForm.value))
                .subscribe((response: IAPIResponse) => {
                    if (response.ok) {
                        this.orgService.getLoadingPoints();
                    }
                    this.inProgress = false;
                    // TODO: handle error
                })
        } else {
            Object.keys(this.loadingPointForm.controls).forEach(controlName => {
                this.loadingPointForm.controls[controlName].markAsDirty()
            });
        }
    }

    onDeleteLoadingPoint(point: LoadingPoint) {
        this.orgService.deleteLoadingPoint(point)
            .subscribe((response: IAPIResponse) => {
                if (response.ok) {
                    this.orgService.getLoadingPoints();
                }
                // TODO: handle error
            })
    }
}