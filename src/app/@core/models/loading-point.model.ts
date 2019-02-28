import { ILoadingPoint } from "../interfaces/loading-point.interface";

export class LoadingPoint implements ILoadingPoint {
    id: number;
    name: string;
    address: string;
    organisationId: string;

    constructor(source: ILoadingPoint) {
        this.id = source.id;
        this.name = source.name;
        this.address = source.address;
        this.organisationId = source.organisationId;
    }

    get apiObj() {
        return {
            id: this.id,
            name: this.name,
            address: this.address
        }
    }
}