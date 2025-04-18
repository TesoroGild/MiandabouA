import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';

import { AuthGuard } from './services/connection/auth.guard';
import { AdminGuard } from './services/admin/admin.guard';
import { ContactComponent } from './components/contact/contact.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BlogComponent } from './components/blog/blog.component';
import { PwdrecoveryComponent } from './components/pwdrecovery/pwdrecovery.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { EmployeeHomePageComponent } from './components/employee-home-page/employee-home-page.component';
import { AdminHomePageComponent } from './components/admin-home-page/admin-home-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employeehome', component: EmployeeHomePageComponent },
  //{ path: 'employeehome', component: EmployeeHomePageComponent, canActivate: [AuthGuard] },
  { path: 'adminhome', component: AdminHomePageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  //{ path: 'dev/:id/modifier', component: DevComponent },
  //{ path: 'dev/:id/modifier', component: DevComponent, canActivate: [AuthGuard] },
  //{ path: 'infra', component: InfraComponent, canActivate: [AuthGuard] },
  { path: 'item', component: ItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }, 
  { path: 'pwdrecovery', component: PwdrecoveryComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AdminGuard] },
  { path: 'registerclient', component: RegisterClientComponent },
  { path: 'user', component: UserComponent, canActivate: [AdminGuard] },
  //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  //{ path: 'admin/:id/modifier', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
