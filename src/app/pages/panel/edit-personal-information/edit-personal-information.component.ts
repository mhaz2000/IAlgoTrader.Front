import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserInformation } from 'src/app/models/user/updateUserInformation';
import { UserService } from 'src/app/services/userService';


@Component({
  selector: 'app-edit-personal-information',
  templateUrl: './edit-personal-information.component.html',
  styleUrls: ['./edit-personal-information.component.css']
})
export class EditPersonalInformationComponent implements OnInit {

  camera = faCamera;

  user: UserInformation = new UserInformation();
  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.editPersonalInformationForm.setValue({
          email: response.content.email || '',
          firstName: response.content.firstName || '',
          lastName: response.content.lastName || '',
          password: '',
          passwordMatch: '',
          phone: response.content.phone || ''
        })
      }
    })
  }

  editPersonalInformationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.minLength(6)]),
    passwordMatch: new FormControl('', [Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)])
  })


  get firstName() {
    return this.editPersonalInformationForm.get('firstName');
  }

  get lastName() {
    return this.editPersonalInformationForm.get('lastName');
  }

  get password() {
    return this.editPersonalInformationForm.get('password');
  }

  get passwordMatch() {
    return this.editPersonalInformationForm.get('passwordMatch');
  }

  get email() {
    return this.editPersonalInformationForm.get('email');
  }

  get phone() {
    return this.editPersonalInformationForm.get('phone');
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }


  message = '';

  setMessage() {
    this.message = this.password?.value == this.passwordMatch?.value ? '' : 'رمز عبور با تکرار آن برابر نیست!';
  }


  update() {
    this.userService.update(new UserInformation(this.firstName?.value || '', this.lastName?.value || '',
      this.email?.value || '', this.phone?.value || '', this.password?.value || '')).subscribe({
        next: (response) => {
          this._snackBar.open(response.message, undefined, {
            duration: 1500,
            panelClass: ['success-snack-bar','panel-snack-bar'],
          });
        },
        error: (e) => {

        }
      })
  }
}
