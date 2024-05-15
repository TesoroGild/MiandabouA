import { Component } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor() {}

  ngOnInit() {}

  cart: Item [] = [];
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

  picture (item: Item) {
    return `${environment.backendUrl}/images/${item.contenthash}`
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

}
