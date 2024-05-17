import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsToDisplay = new BehaviorSubject<Item[]>([]);

  testItem: Item[] = [
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

  constructor(
    private http: HttpClient
  ) {
    //a supprimer
    this.setItemsToDisplay(this.testItem);
  }

  getItems () {
    return this.http.get<any>(
      `${environment.backendUrl}/php/items/itemsGet.php`
    );
  }

  setItemsToDisplay (items: Item[]) {
    this.itemsToDisplay.next(items);
  }

  getItemsToDisplay () {
    return this.itemsToDisplay.asObservable();
  }

  // getData(queryUrl: string,para:any={}) {
  //   let getUrl: string = this.baseUrl + queryUrl;
  //   return this.http.get<any>(getUrl,{params:para});
  // }

  // postDataProd(formAction:string, formData: FormData) {
  //   let postUrl:string = this.baseUrl + formAction;
  //   this.http.post<any>(postUrl, formData).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.msg == "Ajout!") {
  //         this.snackBar.open("Produit ajouté!", "", {
  //           duration: 3000,
  //           horizontalPosition: 'right',
  //           verticalPosition: 'top',
  //           panelClass: 'popup'
  //         });
  //       } else if (res.msg == "Modification!!!") {
  //         this.snackBar.open("Produit Mis à Jour!!!", "", {
  //           duration: 3000,
  //           horizontalPosition: 'right',
  //           verticalPosition: 'bottom',
  //           panelClass: 'popup'
  //         });
  //       }
  //     },
  //     error:(err) => {
  //       console.log(err);
  //       this.snackBar.open("Une erreur est survenue lors de l'ajout!!!", "", {
  //         duration: 3000,
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top',
  //         panelClass: 'popup3'
  //       });
  //     },
  //     complete: () => console.info('complete')
  //   });
  // }
}
