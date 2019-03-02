import { IContact } from "./contact.interface";
import { IDeliveryPoint } from "./delivery-point.interface";

export interface ICustomer {
    id: number;
    name: string;
    contacts: IContact[];
    deliveryPoints: IDeliveryPoint[];
    organisationId: number;
}