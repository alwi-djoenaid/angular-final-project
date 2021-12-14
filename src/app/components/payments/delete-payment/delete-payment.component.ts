import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/services/private/payment';
import { PaymentService } from 'src/app/services/private/payment.service';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.css']
})
export class DeletePaymentComponent implements OnInit {
  @Input() paymentId: number = -1;
  @Input() paymentRecord: Payment = {
    id: -1,
    cardOwnerName: '',
    cardNumber: '',
    securityCode: '',
    expirationDate: new Date(),
  }
  @Output() backButton: EventEmitter<boolean> = new EventEmitter();
  toastMessage: string = "";
  openToast: boolean = false;
  toastType: string = "";

  constructor(private paymentService: PaymentService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.backButton.emit(false);
  }

  deletePayment(){
    this.paymentService.deletePaymentRecord(this.paymentId).subscribe((res) => {
      if(res.success){
        this.showToast(res.message, 'success', 1000);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        this.showToast('An error has been occured, please try again later', 'error', 2000)
      }
    })
  }

  showToast(msg: string, type: string, duration: number){
    this.openToast = true;
    this.toastType = type;
    this.toastMessage = msg;
      setTimeout(() => {
        this.openToast = false;
      }, duration);
  }

}
