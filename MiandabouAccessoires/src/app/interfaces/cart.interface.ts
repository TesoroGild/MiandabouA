import { Item } from "./item.interface";

export interface Cart {
    username: string;
    items: Item [];
    totalPrice: string;
}