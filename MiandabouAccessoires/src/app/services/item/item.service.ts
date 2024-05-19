import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsToDisplay: BehaviorSubject<Item[]>;
  private itemsInPromotions: BehaviorSubject<Item[]>;
  private bestItemsSold: BehaviorSubject<Item[]>;
  itd: Item[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.itemsToDisplay = new BehaviorSubject<Item[]>([]);
    this.itemsInPromotions = new BehaviorSubject<Item[]>([]);
    this.bestItemsSold = new BehaviorSubject<Item[]>([]);
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

  getPromoItems (): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      let promos: Item[] = [];
      this.itemsToDisplay.subscribe((items: any) => {
        let tmp1: Item[] = items.items;
        promos = tmp1.filter((item: Item) => Number(item.promo) !== 0);
        this.itemsInPromotions.next(promos);
        resolve(promos);
      },
      error => reject(error)
      )
    });
  }

  getBestSellingItems (): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      let bestSaled: Item[] = [];
      this.itemsToDisplay.subscribe((items: any) => {
        let tmp2: Item[] = items.items;
        bestSaled = tmp2.sort((a: Item, b: Item) => b.totalSell - a.totalSell);
        bestSaled = bestSaled.slice(0, 10);
        this.bestItemsSold.next(bestSaled);
        resolve(bestSaled);
      },
      error => reject(error)
      );
    });
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
