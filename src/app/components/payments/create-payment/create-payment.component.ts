import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/private/payment.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css'],
  providers: [DatePipe]
})
export class CreatePaymentComponent implements OnInit {

  today: Date = new Date();
  month: number = 0;
  year: number = 0;
  toastMessage: string = "";
  openToast: boolean = false;
  toastType: string = "";

  paymentForm = new FormGroup({
    cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    securityCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    expirationDate: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get cardOwnerName(){
    return this.paymentForm.get('cardOwnerName');
  }

  get cardNumber(){
    return this.paymentForm.get('cardNumber');
  }

  get securityCode(){
    return this.paymentForm.get('securityCode');
  }

  get expirationDate(){
    return this.paymentForm.get('expirationDate');
  }

  constructor(private paymentService: PaymentService, 
    private datePipe: DatePipe, 
    private router: Router) { }

  ngOnInit(): void {
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
   if ((charCode > 47 && charCode < 58) || (charCode == 46)){
      return true;
    }
    return false;
  }

  createPayment(){
    if(this.paymentForm.valid && this.validateDate()){
      this.validateDate();
      this.paymentService.createPaymentRecord(this.paymentForm.value).subscribe((res) => {
        if(res){
          this.showToast("Payment record has been created!", "success", 1000);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
        else {
          this.showToast('An error has been occured, please try again later', 'error', 2000)
        }
      });
    } else {
      this.showToast("Invalid input!", "error", 2000);
      this.openToast = true;
      setTimeout(() => {
        this.openToast = false;
      }, 2000);
    }
    
  }

  validateDate(){
    let dateForm = this.expirationDate?.value;
    let splitDate = dateForm.split('/');
    
    this.month = parseInt(splitDate[0]);
    this.year = parseInt(splitDate[1]);

    if(this.month > 12){
      this.paymentForm.get('expirationDate')?.markAsUntouched;
      return false;
    } else {
      let convertDate = this.datePipe.transform(new Date(2000 + this.year, this.month - 1, 1), 'YYYY-MM-dd');
      this.paymentForm.get('expirationDate')?.setValue(convertDate);
      return true;
    }
  }

  showToast(msg: string, type: string, timeout: number){
    this.openToast = true;
    this.toastType = type;
    this.toastMessage = msg;
      setTimeout(() => {
        this.openToast = false;
    }, timeout);
  }
}
