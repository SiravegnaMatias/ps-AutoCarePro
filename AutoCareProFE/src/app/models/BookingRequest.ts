import { Service } from "./Service";

export interface BookingRequest {
    userId: number;
    date: string;
    vehicleId: number;
    additionalNotes: string;
    services: Service[];
}