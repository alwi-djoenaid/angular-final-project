import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { CreatePaymentComponent } from './components/payments/create-payment/create-payment.component';
import { EditPaymentComponent } from './components/payments/edit-payment/edit-payment.component';
import { HomeComponent } from './components/payments/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreatePaymentComponent, canActivate: [AuthGuard]},
  { path: 'details/:id', component: EditPaymentComponent, canActivate: [AuthGuard]},
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
