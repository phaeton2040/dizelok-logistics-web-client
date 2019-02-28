import { IOrganisation } from "../interfaces/organisation.interface";

export class Organisation implements IOrganisation {
    id: number;
    name: string;
    phone: string;
    primaryEmail: string;

    constructor(source: IOrganisation) {
        this.id = source.id;
        this.name = source.name;
        this.phone = source.phone;
        this.primaryEmail = source.primaryEmail;
    }

    get apiObj() {
        return {
            name: this.name,
            phone: this.phone,
            primaryEmail: this.primaryEmail,
            id: this.id
        }
    }
}