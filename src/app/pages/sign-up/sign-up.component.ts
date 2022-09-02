import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterUserRequest } from 'src/app/models/register/registerUserRequest';
import { UserService } from 'src/app/services/userService';
import { notMatchedValidator } from 'src/app/validators/signUpValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  isMatched = false;
  signUpForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    matchPassword: new FormControl('', [Validators.required, notMatchedValidator]),
    phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  });


  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get matchPassword() {
    return this.signUpForm.get('matchPassword');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }


  onSubmit() {

  }

  navigateToSignIn() {
    this.router.navigate(['signIn'])
  }

  message = '';

  setMessage() {
    this.message = this.password?.value == this.matchPassword?.value ? '' : 'رمز عبور با تکرار آن برابر نیست!';
  }

  CreateUser() {
    this.userService.register(
      new RegisterUserRequest(this.firstName?.value, this.lastName?.value, this.email?.value, this.phone?.value, this.password?.value))
      .subscribe({
        next: (response) => {
          this._snackBar.open(response.message, undefined, {
            duration: 1500,
            panelClass: ['success-snack-bar'],
          });
          setTimeout(() => {
            this.router.navigate(['signIn'])
          }, 1500)
        },
        error: (e) => {
          this._snackBar.open(e.error.message, undefined, {
            duration: 3000,
            panelClass: ['error-snack-bar'],
          });
        }
      })
  }

  onKeyPress(event: any) {
  }
}
