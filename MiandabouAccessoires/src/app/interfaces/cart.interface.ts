import { Item } from "./item.interface";

//rename in bill and add properties
export interface Cart {
    username: string;
    items: Item [];
    totalPrice: string;
}