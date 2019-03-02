import { IDeliveryPoint } from "../interfaces/delivery-point.interface";

export class DeliveryPoint implements IDeliveryPoint {
    id: number;
    name: string;
    address: string;
    customerId: string;

    constructor(source: IDeliveryPoint) {
        this.id = source.id;
        this.name = source.name;
        this.address = source.address;
        this.customerId = source.customerId;
    }

    get apiObj() {
        return {
            id: this.id,
            name: this.name,
            address: this.address
        }
    }
}