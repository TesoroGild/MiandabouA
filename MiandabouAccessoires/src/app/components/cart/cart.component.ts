import { Component } from '@angular/core';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getItemsCartToDisplay().subscribe(items => {
      this.cart = items;
    });
  }

  cart: ItemCart [] = [];
  total: number = 0;
  subTotal: number = 0;
  Tvq: number = 9.975;
  Tps: number = 5;
  modal: boolean = false;

  cartEmpty() {
    if (this.cart.length != 0)
      return false;
    else return true;
  }

  addToCart (item: Item) {
    this.cartService.addToCart(item);
  }

  removeFromCart (item: Item) {
    this.cartService.removeFromCart(item);
  }

  deleteFromCart (item: Item) {
    this.cartService.deleteFromCart(item);
  }

  getQuantityInCart (id: string) {
    return this.cartService.getQuantityBuy(id);
  }

  totalCalculate () {
    
  }

  subTotalCalculate () {

  }

  TvqCalculate () {

  }

  TpsCalculate () {

  }

  order () {
    
  }

  buy () {

  }

  picture (item: ItemCart) {
    return `${environment.backendUrl}/images/itemPic/${item.item.contenthash}`
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

}
