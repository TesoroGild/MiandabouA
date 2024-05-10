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
    status: string;
    //deliveryAddress: string;
}

export interface UserToDisplay {
    id?: string;
    username?: string;
    lastname: string;
    role: string;
    firstname: string;
    department?: string;
    picture?: string;
    tel?: string;
    email: string;
    status: string;
    //deliveryAddress: string;
}