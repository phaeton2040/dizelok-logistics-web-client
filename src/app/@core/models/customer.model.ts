import { ICustomer } from "../interfaces/customer.interface";
import { IContact } from "../interfaces/contact.interface";
import { IDeliveryPoint } from "../interfaces/delivery-point.interface";

export class Customer implements ICustomer {
    id: number;
    name: string;
    contacts: IContact[];
    deliveryPoints: IDeliveryPoint[];
    organisationId: number;

    constructor(source: ICustomer) {
        this.id = source.id;
        this.name = source.name;
        this.contacts = source.contacts;
        this.deliveryPoints = source.deliveryPoints;
        this.organisationId = source.organisationId;
    }

    get apiObj() {
        return {
            id: this.id,
            name: this.name,
            contacts: this.contacts,
            deliveryPoints: this.deliveryPoints,
            organisationId: this.organisationId
        }
    }
}