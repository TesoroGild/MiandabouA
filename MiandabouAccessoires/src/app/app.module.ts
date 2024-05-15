import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { UserComponent } from './components/user/user.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AppRoutingModule } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { PwdrecoveryComponent } from './components/pwdrecovery/pwdrecovery.component';
import { RegisterComponent } from './components/register/register.component';
import { BillComponent } from './components/bill/bill.component';
import { ContactComponent } from './components/contact/contact.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BillComponent,
    CartComponent,
    ContactComponent,
    FootbarComponent,
    HomeComponent,
    ItemComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    UserComponent,
    PwdrecoveryComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    LazyLoadImageModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}