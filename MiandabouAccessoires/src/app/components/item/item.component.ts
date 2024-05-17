import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  items: Item[] = [];
  quantityBuy: number = 0;

  constructor (
    private cartService: CartService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems () {
    this.itemService.getItems().subscribe(items => {
      console.log(items.items);
      if (items.items != null && items.items != undefined) {
        this.items = items.items;
        this.itemService.setItemsToDisplay(this.items);
      }
    });
  }

  addToCart () {

  }

  removeFromCart () {

  }

  changeQuantity () {
    
  }

  picture (contenthash: any) {
    return `${environment.backendUrl}/images/itemPic/${contenthash}`
  }

}
