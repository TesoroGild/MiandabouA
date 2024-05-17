import { Component } from '@angular/core';
import { ItemCart } from '../../interfaces/item-cart.interface';
import { environment } from '../../../environments/dev.environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor() {}

  ngOnInit() {}

  test: ItemCart[] = [
    {
      id: '1',
      name: 'test1',
      price: '1000',
      quantityBye: 1,
      contenthash: '',
      picture: '../../../assets/img/test1.jpeg'
    },
    {
      id: '2',
      name: 'test2',
      price: '2000',
      quantityBye: 1,
      contenthash: '',
      picture: '../../../assets/img/test2.png'
    },
    {
      id: '3',
      name: 'test3',
      price: '3000',
      quantityBye: 5,
      contenthash: '',
      picture: '../../../assets/img/test3.png'
    },
    {
      id: '4',
      name: 'test4',
      price: '4000',
      quantityBye: 5,
      contenthash: '',
      picture: '../../../assets/img/test4.png'
    },
    {
      id: '5',
      name: 'test5',
      price: '500',
      quantityBye: 3,
      contenthash: '',
      picture: '../../../assets/img/test5.png'
    },
    {
      id: '6',
      name: 'test6',
      price: '2000',
      quantityBye: 2,
      contenthash: '',
      picture: '../../../assets/img/test6.png'
    },
    {
      id: '7',
      name: 'test7',
      price: '3000',
      quantityBye: 1,
      contenthash: '',
      picture: '../../../assets/img/test7.png'
    }
  ];

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
    return `${environment.backendUrl}/images/${item.contenthash}`
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

}
