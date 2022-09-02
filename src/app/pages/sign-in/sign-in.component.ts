import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest } from 'src/app/models/Login/userLoginRequest';
import { UserService } from 'src/app/services/userService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'src/app/services/cookieService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  singInForm = new FormGroup({
    emailOrPhone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get emailOrPhone() {
    return this.singInForm.get('emailOrPhone');
  }

  get password() {
    return this.singInForm.get('password');
  }

  navigateToSignUp() {
    this.router.navigate(['signUp'])
  }

  singIn() {
    this.userService.login(new UserLoginRequest(this.emailOrPhone?.value || '', this.password?.value || ''))
      .subscribe({
        next: (response) => {
          this.cookieService.deleteCookie('authToken');
          this.cookieService.setCookie('authToken', response.content.authToken, response.content.expires_in);
          this._snackBar.open(response.message, undefined, {
            duration: 1500,
            panelClass: ['success-snack-bar'],
          });
          setTimeout(() => {
            if (response.content.isAdmin)
              this.router.navigate(['admin'])
            else
              this.router.navigate(['client'])
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
}
