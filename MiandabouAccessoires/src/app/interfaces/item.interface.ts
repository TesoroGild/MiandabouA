export interface Item {
    id: string;
    gender: string;
    category: string;
    name: string;
    description : string;
    picture: string;
    contenthash : string;
    video : string;
    price : string;
    quantityS: number;
    quantityM: number;
    quantityL: number;
    quantityXl: number;
    promo: number;
    datePromoFin: string;
    //penser a faire un tableau de rate car ce n'est pas une seule personne qui note le produit
    rate: number;
    totalSell: number;
}
export interface ItemCaisse {
    id: string;
    name: string;
    price : string;
    promo: number;
    rate: number;
}

export interface ItemCart {
    item: Item;
    quantityBuy: number;
}