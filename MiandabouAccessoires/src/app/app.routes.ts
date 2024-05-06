import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';
import { ItemComponent } from './components/item/item.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';

import { AuthGuard } from './services/connection/auth.guard';
import { AdminGuard } from './services/admin/admin.guard';
import { ContactComponent } from './components/contact/contact.component';
import { BillComponent } from './components/bill/bill.component';
import { PwdrecoveryComponent } from './components/pwdrecovery/pwdrecovery.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'bill', component: BillComponent },
    { path: 'chart', component: ChartComponent },
    { path: 'contact', component: ContactComponent },
      //{ path: 'dev/:id/modifier', component: DevComponent },
      //{ path: 'dev/:id/modifier', component: DevComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
      //{ path: 'infra', component: InfraComponent, canActivate: [AuthGuard] },
    { path: 'item', component: ItemComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }, 
    { path: 'pwdrecovery', component: PwdrecoveryComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserComponent, canActivate: [AdminGuard] },
      //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      //{ path: 'admin/:id/modifier', component: AdminComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
