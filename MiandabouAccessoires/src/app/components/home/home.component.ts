import { Component } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import Splide from '@splidejs/splide';
// Default theme
import '@splidejs/splide/css';


// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';


// or only core styles
import '@splidejs/splide/css/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  promos: Item[] = [];
  bebstSelling: Item[] = [];
  blogs: any[] = [];
  test: Item[] = [
    {
      id: '1',
      category: 'Clothes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test1',
      price: '1000',
      quantity: 10,
      contenthash: '',
      picture: '../../../assets/img/test1.jpeg',
      video: '',
      promo: 10,
      datePromoFin: '2024-05-15'
    },
    {
      id: '2',
      category: 'Pants',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test2',
      price: '2000',
      quantity: 20,
      contenthash: '',
      picture: '../../../assets/img/test2.png',
      video: '',
      promo: 50,
      datePromoFin: '2024-05-15'
    },
    {
      id: '3',
      category: 'Shoes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test3',
      price: '3000',
      quantity: 30,
      contenthash: '',
      picture: '../../../assets/img/test3.png',
      video: '',
      promo: 35,
      datePromoFin: '2024-05-15'
    },
    {
      id: '4',
      category: 'Skirt',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test4',
      price: '4000',
      quantity: 5,
      contenthash: '',
      picture: '../../../assets/img/test4.png',
      video: '',
      promo: 15,
      datePromoFin: '2024-05-15'
    },
    {
      id: '5',
      category: 'Accessories',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test5',
      price: '500',
      quantity: 10,
      contenthash: '',
      picture: '../../../assets/img/test5.png',
      video: '',
      promo: 0,
      datePromoFin: '2024-05-15'
    },
    {
      id: '6',
      category: 'Clothes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test6',
      price: '2000',
      quantity: 30,
      contenthash: '',
      picture: '../../../assets/img/test6.png',
      video: '',
      promo: 0,
      datePromoFin: '2024-05-15'
    },
    {
      id: '7',
      category: 'Skirt',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      name: 'test7',
      price: '3000',
      quantity: 3,
      contenthash: '',
      picture: '../../../assets/img/test7.png',
      video: '',
      promo: 15,
      datePromoFin: '2024-05-15'
    }
  ];

  constructor() {}

  ngAfterViewInit(): void {
    new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      duration: 2000,
      pagination: false,
      speed: 1000
    }).mount();

    new Splide(`#bestSelling`, {
      type: 'loop',
      perPage: 5,
      autoplay: true,
      duration: 3000,
      pagination: false,
      speed: 1000,
      perMove: 1
    }).mount();
  }

  isPromoNotEmpty(): boolean {
    return this.promos.length !== 0;
  }

  isBestSellingNotEmpty(): boolean {
    return this.bebstSelling.length !== 0;
  }

  isBlogNotEmpty(): boolean {
    return this.blogs.length !== 0;
  }

  isTestEmpty(): boolean {
    return this.test.length !== 0;
  }

  promoPrice (price: string, promo: number) {
    let priceNumber = parseInt(price);
    return priceNumber - (priceNumber * promo) / 100;
  }
}
