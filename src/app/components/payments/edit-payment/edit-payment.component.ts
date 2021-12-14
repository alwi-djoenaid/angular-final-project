import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/services/private/payment';
import { PaymentService } from 'src/app/services/private/payment.service';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css'],
  providers: [DatePipe]
})
export class EditPaymentComponent implements OnInit {

  paymentId: number = -1;
  paymentRecord: Payment = {
    id: -1,
    cardOwnerName: '',
    cardNumber: '',
    securityCode: '',
    expirationDate: new Date(),
  };

  month: number = 0;
  year: number = 0;

  toastMessage: string = "";
  openToast: boolean = false;
  toastType: string = "";

  paymentForm = new FormGroup({
    id: new FormControl(this.actRoute.snapshot.params.id),
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

  constructor(private actRoute: ActivatedRoute, 
    private paymentService: PaymentService, 
    private datePipe: DatePipe, private router: Router) { 
    this.paymentId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getPaymentRecord();
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
   if ((charCode > 47 && charCode < 58) || (charCode == 46)){
      return true;
    }
    return false;
  }

  getPaymentRecord(){
    this.paymentService.getPaymentById(this.paymentId).subscribe((res) => {
      this.paymentRecord = res.payment;
      let convertDate = this.datePipe.transform(this.paymentRecord.expirationDate, 'MM/yy' );

      this.paymentForm.get('cardOwnerName')?.setValue(this.paymentRecord.cardOwnerName);
      this.paymentForm.get('cardNumber')?.setValue(this.paymentRecord.cardNumber);
      this.paymentForm.get('securityCode')?.setValue(this.paymentRecord.securityCode);
      this.paymentForm.get('expirationDate')?.setValue(convertDate);
    });
  }

  updatePayment(){
    if(this.paymentForm.valid){
      this.validateDate();
      this.paymentService.updatePaymentRecord(this.paymentId, this.paymentForm.value).subscribe((res) => {
        // Tidak ada validasi lebih lanjut karena balikan dari server memang null
        this.showToast("Payment record has been updated!", "success", 1000);
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
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

    let convertDate = this.datePipe.transform(new Date(2000 + this.year, this.month - 1, 1), 'YYYY-MM-dd');

    this.paymentForm.get('expirationDate')?.setValue(convertDate);
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
