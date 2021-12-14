import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/services/private/payment';
import { PaymentService } from 'src/app/services/private/payment.service';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paymentRecords = [] as any;
  openModal: boolean = false;
  selectedPayment: number = -1;
  selectedPaymentRecord: Payment = {
    id: -1,
    cardOwnerName: '',
    cardNumber: '',
    securityCode: '',
    expirationDate: new Date(),
  };

  constructor(private paymentService: PaymentService, public router: Router) { }

  ngOnInit(): void {
    this.getPaymentRecords();
  }

  getPaymentRecords(){
    return this.paymentService.getPaymentRecords().subscribe((res) => {
      this.paymentRecords = res.payments;
    });
  }

  openDeleteModal(payment: Payment){
    this.selectedPaymentRecord = payment;
    this.selectedPayment = payment.id!
    this.openModal = true;
  }

  closeModal(e: any){
    this.openModal = e;
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

}
