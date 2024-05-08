export interface User {
    id?: string;
    username?: string;
    password: string;
    lastname: string;
    role: string;
    firstname: string;
    dateOfBirth?: string;
    department?: string;
    picture?: string;
    tel?: string;
    email: string;
    statut: string;
    //deliveryAddress: string;
}