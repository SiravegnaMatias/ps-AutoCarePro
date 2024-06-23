export interface OrderRequestDTO {
    userId:number;
    orderDetails:OrderDetailDTO[];  
    paymentMethod:string;
}


export interface OrderDetailDTO{
    productId:number;
    quantity:number;
}