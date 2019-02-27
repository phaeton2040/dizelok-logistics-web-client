import { IOrganisation } from "../interfaces/organisation.interface";

export class Organisation implements IOrganisation {
    id: number;
    name: string;
    phone: string;
    
    primary_email: string;

    constructor(source: IOrganisation) {
        this.id = source.id;
        this.name = source.name;
        this.phone = source.phone;
        this.primary_email = source.primary_email || source.primaryEmail;
    }

    get primaryEmail() {
        return this.primary_email;
    }

    get apiObj() {
        return {
            name: this.name,
            phone: this.phone,
            primary_email: this.primaryEmail,
            id: this.id
        }
    }
}