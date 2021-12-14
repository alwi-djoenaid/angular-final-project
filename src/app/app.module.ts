import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/payments/home/home.component';
import { EditPaymentComponent } from './components/payments/edit-payment/edit-payment.component';
import { CreatePaymentComponent } from './components/payments/create-payment/create-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptor';
import { DeletePaymentComponent } from './components/payments/delete-payment/delete-payment.component';
import { ToastComponent } from './toast/toast.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    EditPaymentComponent,
    CreatePaymentComponent,
    DeletePaymentComponent,
    ToastComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
