import { Component } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  promos: Item [] = [];
  bebstSelling: Item [] = [];
  blogs: any [] = [];
  test: Item [] = [
    {
      id: "1",
      category: "clothes",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
      name: "test1",
      price: "1000",
      quantity: 10,
      contenthash: "",
      picture: "../../../assets/img/test1.jpeg",
      video: ""
    },
    {
      id: "2",
      category: "pants",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
      name: "test2",
      price: "2000",
      quantity: 20,
      contenthash: "",
      picture: "../../../assets/img/test2.png",
      video: ""
    },
    {
      id: "3",
      category: "shoes",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...",
      name: "test3",
      price: "3000",
      quantity: 30,
      contenthash: "",
      picture: "../../../assets/img/test3.png",
      video: ""
    }
  ]

  constructor() { }

  isPromoNotEmpty(): boolean {
    return this.promos.length !== 0
  }

  isBestSellingNotEmpty(): boolean {
    return this.bebstSelling.length !== 0
  }

  isBlogNotEmpty(): boolean {
    return this.blogs.length !== 0
  }

  isTestEmpty(): boolean {
    return this.test.length !== 0
  }

}
