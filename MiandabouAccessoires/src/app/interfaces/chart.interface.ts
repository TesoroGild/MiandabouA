import { Item } from "./item.interface";

export interface Chart {
    username: string;
    items: Item [];
    totalPrice: string;
}