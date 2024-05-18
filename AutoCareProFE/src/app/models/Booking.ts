import { Service } from "./Service";

export interface Booking {
    id: number;
    date: string;
    vehicle: String;
    services: Service[];
    status: string;
}