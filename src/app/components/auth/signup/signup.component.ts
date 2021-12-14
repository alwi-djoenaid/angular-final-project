import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  toastMessage: string = "";
  openToast: boolean = false;
  toastType: string = "";

  constructor(public authService: AuthService, public router: Router) { }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get username(){
    return this.signupForm.get('username');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.signupForm.valid){
      this.authService.signUp(this.signupForm.value).subscribe((res) => {
        if(res.success){
          this.signupForm.reset();
          this.showToast("User has been created!", "success", 1000);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
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

  showToast(msg: string, type: string, timeout: number){
    this.openToast = true;
    this.toastType = type;
    this.toastMessage = msg;
      setTimeout(() => {
        this.openToast = false;
    }, timeout);
  }

}
