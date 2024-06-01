import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item.interface';
import { environment } from '../../../environments/dev.environment';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

  items$ = this.itemService.getAllItems();
  itemsSubscription: Subscription;
  items: Item[] = [];
  quantityBuy: number = 0;

  constructor (
    private cartService: CartService,
    private router: Router, 
    private itemService: ItemService
  ) {
    this.itemsSubscription = this.items$.subscribe((i) => {
      this.items = i;
    });
  }

  ngOnInit() {
    this.getItems();
  }

  getItems () {
    this.itemService.getItems();
  }
  // getItems () {
  //   this.itemService.getItems().subscribe(items => {
  //     if (items.items != null && items.items != undefined) {
  //       this.items = items.items;
  //       this.itemService.setItemsToDisplay(this.items);
  //     }
  //   });
  // }

  addToCart (item: Item) {
    this.cartService.addToCart(item);
  }

  removeFromCart (item: Item) {
    this.cartService.removeFromCart(item);
  }

  getQuantityInCart (id: string) {
    return this.cartService.getQuantityBuy(id);
  }

  picture (contenthash: any) {
    return `${environment.backendUrl}/images/itemPic/${contenthash}`
  }

  cartPage () {
    this.router.navigate(['/cart']);
  }

}
