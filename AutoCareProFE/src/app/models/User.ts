export interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    address:string;
}

export interface Role {
    id: number;
    name: string;
}