import { Component } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import Splide from '@splidejs/splide';
import { Blog } from '../../interfaces/blog.interface';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

// Default theme
import '@splidejs/splide/css';

// or other themes
import '@splidejs/splide/css/skyblue';
import '@splidejs/splide/css/sea-green';

// or only core styles
import '@splidejs/splide/css/core';
import { EmailService } from '../../services/email/email.service';

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
    private router: Router, 
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private mailService: EmailService
  ) {}

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
      perPage: 4,
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

  blogsPage () {
    this.router.navigate(['/blog']);
  }

  enableAlerts () {

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

  subscribeNewsLetter () {
    console.log("HOME: NEWSLETTER SUBCRIPTION");
      let emailValue = this.alertForm.get("email")?.value;
      const newsLetterSubscription = new FormData();
      newsLetterSubscription.append("email", this.alertForm.get("email")?.value);

      if (emailValue != null) {
        /*this.mailService.subscribeNewsLetter(newsLetterSubscription).subscribe((subscriptionResponse: any) => {
          console.log(subscriptionResponse);
          if (subscriptionResponse != null && subscriptionResponse != "") {
            this.snackBar.open("Inscription reussie!", "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success'
            });
            this.alertForm.reset();
          } else {
            this.snackBar.open(subscriptionResponse.msg, "", {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'fail'
            });
          }
        });*/
      } else this.alertForm.markAllAsTouched();
  }
}
