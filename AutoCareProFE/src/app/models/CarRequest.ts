export interface CarRequest {
    brand: string;
    model: string;
    year: number;
    carType: string;
    plate: string;
    userId: number;
}

export interface CarResponse {
    id:number;
    brand: string;
    model: string;
    year: number;
    carType: string;
    plate: string;
    userId: number;
}