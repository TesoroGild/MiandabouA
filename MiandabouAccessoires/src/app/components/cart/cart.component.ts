import { Component } from '@angular/core';
import { ItemCart } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';
import { BehaviorSubject } from 'rxjs';
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
      console.log(this.cart)
    });
  }

  cart: ItemCart [] = [];
  total: number = 0;
  subTotal: number = 0;
  Tvq: number = 0;
  Tps: number = 0;
  modal: boolean = false;

  cartEmpty() {
    if (this.cart.length != 0)
      return false;
    else return true;
  }

  addItem () {

  }

  removeItem (id: string) {
    
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
