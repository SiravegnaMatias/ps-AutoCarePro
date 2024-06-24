import { Product } from "../Product";
import { User } from "../User";

export interface Order {
    orderId:number;
    user:User;
    date:Date;
    total:number;
    payment:string;
    status:string;
    products:OrderProduct[];
}

export interface OrderProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    quantity:number;
}

export interface OrderStatus{
    id:number;
    name:string;
}