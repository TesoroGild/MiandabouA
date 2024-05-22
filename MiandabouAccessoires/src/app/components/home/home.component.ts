import { Component, ElementRef, ViewChild } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { Blog } from '../../interfaces/blog.interface';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from '../../services/email/email.service';
import { ItemService } from '../../services/item/item.service';
import { environment } from '../../../environments/dev.environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  //@ViewChild('carousel', { static: true }) carousel!: ElementRef;
  //@ViewChild('carousel') carousel!: ElementRef<HTMLButtonElement>;
  @ViewChild('carousel', { read: ElementRef }) public carousel!: ElementRef<any>;

  promos$ = this.itemService.getPromoItems();
  promosSubscription: Subscription;
  promos: Item[] = [];
  bestSelling$ = this.itemService.getBestSellingItems();
  bestSellingSubscription: Subscription;
  bestSelling: Item[] = [];
  blogs: any[] = [];
  
  cardList:any;

  testPromos: Item[] = [
    {
      id: '1',
      name: 'Unique products',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/044.webp',
      video: '',
      gender: 'male',
    category: 'top',
    price : '100',
    quantityS: 2,
    quantityM: 3,
    quantityL: 1,
    quantityXl: 3,
    promo: 10,
    datePromoFin: '2024-05-19',
    //penser a faire un tableau de rate car ce n'est pas une seule personne qui note le produit
    rate: 4,
    totalSell: 5
    },
    {
      id: '2',
      name: 'Unique pro',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/045.webp',
      video: '',
      gender: 'female',
    category: 'bottmo',
    price : '3000',
    quantityS: 2,
    quantityM: 3,
    quantityL: 1,
    quantityXl: 3,
    promo: 25,
    datePromoFin: '2024-05-19',
    //penser a faire un tableau de rate car ce n'est pas une seule personne qui note le produit
    rate: 2,
    totalSell: 10
    }
  ];

  test2: Blog [] = [
    {
      id: '1',
      title: 'Unique products',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      author: 'Mariam',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/044.webp',
      video: '',
      datePosted: '2024-05-16'
    },
    {
      id: '2',
      title: 'Our contribution to the environment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      author: 'Eva',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/043.webp',
      video: '',
      datePosted: '2024-05-16'
    },
    {
      id: '3',
      title: 'LGBTQ+ community',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      author: 'Kellygrace',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/042.webp',
      video: '',
      datePosted: '2024-05-16'
    },
    {
      id: '4',
      title: 'Our Projets',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore...',
      author: 'Mariam',
      contenthash: '',
      picture: 'https://tecdn.b-cdn.net/img/new/standard/city/041.webp',
      video: '',
      datePosted: '2024-05-16'
    }
  ];

  alertForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        Validators.required,
        Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
        Validators.maxLength(35),
      ],
    ]
  });

  constructor(
    private snackBar: MatSnackBar,
    private router: Router, 
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private itemService: ItemService
  ) {
    this.promosSubscription = this.promos$.subscribe((p) => {
      this.promos = p;
      this.cardList = document.querySelector('.test');
    });
    this.bestSellingSubscription = this.bestSelling$.subscribe((b) => {
      this.bestSelling = b;
    });
  }

  ngOnInit (): void {
    this.getItems();
    this.blogs = this.test2;
  }

  ngOnDestroy () {
    if (this.promosSubscription) {
      this.promosSubscription.unsubscribe();
    }
    if (this.bestSellingSubscription) {
      this.bestSellingSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.displaySlideButton()
        //this.updateScrollThumbPosition();
      }, 1000);
    this.carousel.nativeElement.addEventListener('scroll', this.updateScrollThumbPosition.bind(this));
    this.carousel.nativeElement.addEventListener('scroll', this.displaySlideButton.bind(this));
  }

  getItems () {
    this.itemService.getItems();
  }

  isPromoNotEmpty() {
    return this.promos.length !== 0;
  }

  isBestSellingNotEmpty(){
    return this.bestSelling.length !== 0;
  }

  isBlogNotEmpty(): boolean {
    return this.blogs.length !== 0;
  }

  promoPrice (price: string, promo: number) {
    let priceNumber = parseInt(price);
    return priceNumber - (priceNumber * promo) / 100;
  }

  blogsPage () {
    this.router.navigate(['/blog']);
  }

  itemsPage () {
    this.router.navigate(['/item']);
  }

  subscribeNewsLetter () {
    console.log("ENABLE ALERTS");
    let emailValue = this.alertForm.get("email")?.value;
    const mailToAlert = new FormData();
    mailToAlert.append("email", this.alertForm.get("email")?.value);
      
    if (emailValue != null && emailValue != "") {
      this.emailService.addEmail(mailToAlert).subscribe((mailAdded: any) => {
        //
        console.log(mailAdded.mail);
        if (mailAdded.mail != null && mailAdded.mail != undefined) {
          this.emailService.sendEmail(mailAdded.mail);
          this.snackBar.open("Mail ajouté!", "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success'
          });
          this.alertForm.reset();
        } else {
          this.snackBar.open(mailAdded.msg, "", {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'fail'
          });
        }
      });
    } else this.alertForm.markAllAsTouched();
  }

  //email
  emailEmpty(): boolean {
    return this.showError("email", "required");
  }

  emailFormat(): boolean {
    return this.alertForm.get('email')!.hasError('pattern') 
      && this.alertForm.get('email')!.touched;
  }

  emailLength(): boolean {
    return this.alertForm.get('email')!.hasError('maxlength') 
      && this.alertForm.get('email')!.touched;
  }

  private showError(
    field: "email", 
    error: string): boolean {
    return (
      this.alertForm.controls[field].hasError(error) &&
      (this.alertForm.controls[field].dirty || this.alertForm.controls[field].touched)
    );
  }

  picture (contenthash: string) {
    return `${environment.backendUrl}/images/itemPic/${contenthash}`
  }

  displaySlideButton () {
    const buttons = Array.from(document.getElementsByClassName('slide-button') as HTMLCollectionOf<HTMLElement>);
    if (buttons.length < 2) return;

    if (this.promos.length < 2) {console.log("AAAAAAAAAAAAAA")
      buttons[0].style.display = 'none';
      buttons[1].style.display = 'none';
    } else {console.log("BBBBBBBBBB")
      const maxScrollLeft = this.cardList!.scrollWidth - this.cardList!.clientWidth;
      buttons[0].style.display = this.cardList!.scrollLeft <= 0 ? 'none' : 'block';
      buttons[1].style.display = this.cardList!.scrollLeft >= maxScrollLeft ? 'none' : 'block';
    }
  }

  previousSlide () {
    console.log("PREV SLIDE")
    if (this.carousel) {
      this.carousel.nativeElement.scrollBy({ left: -window.innerWidth * 0.95, behavior: 'smooth' });
      // setTimeout(() => {
      //   this.displaySlideButton()
      //   //this.updateScrollThumbPosition();
      // }, 300);
    }
    //this.displaySlideButton()
    //this.updateScrollThumbPosition();
  }

  nextSlide () {
    if (this.carousel) {
      this.cardList!.scrollBy({ left: window.innerWidth * 0.95, behavior: 'smooth' });
      // setTimeout(() => {
      //   this.displaySlideButton()
      //   //this.updateScrollThumbPosition();
      // }, 300);
    }
    // this.displaySlideButton()
    // this.updateScrollThumbPosition();
  }

  updateScrollThumbPosition () {
    //const cardList = document.querySelector('.test');
    const sliderScrollBar = document.querySelector('.slider-scrollbar');
    const scrollBarThumb = sliderScrollBar?.querySelector('.scrollbar-thumb') as HTMLElement;
    
    if (!sliderScrollBar || !scrollBarThumb) {
      return; // Exit if elements are not found
    }

    const maxScrollLeft = this.cardList!.scrollWidth - this.cardList!.clientWidth;
    const scrollPosition = this.cardList!.scrollLeft;
    const thumbPosition = ((scrollPosition) / maxScrollLeft) * (sliderScrollBar!.clientWidth - scrollBarThumb!.offsetWidth);
    console.log('('+scrollPosition+'/'+maxScrollLeft+') * ('+sliderScrollBar!.clientWidth+'-'+scrollBarThumb!.offsetWidth+')');
    scrollBarThumb!.style.left = `${thumbPosition}px`;
  }

}
