import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  toastMessage: string = "";
  openToast: boolean = false;
  toastType: string = "";

  constructor(public authService: AuthService, private router: Router) { }

  signInForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get password(){
    return this.signInForm.get('password');
  }

  get email(){
    return this.signInForm.get('email');
  }

  ngOnInit(): void {
  }

  signIn(){
    if(this.email?.valid && this.password?.valid){
      this.authService.signIn(this.signInForm.value).subscribe((res: any) => {
        if(res.success){
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('refresh_token', res.refreshToken);
          this.showToast("Login successful", "success", 1000);
          setTimeout(() => {
            this.router.navigate(['/home']);
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
