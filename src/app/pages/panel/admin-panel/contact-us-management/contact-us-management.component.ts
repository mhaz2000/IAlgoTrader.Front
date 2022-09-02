import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEdit, faPhone, faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ContactUs } from 'src/app/models/contactUs/contactUsUpdate';
import { ContactUsService } from 'src/app/services/contactUsService';

@Component({
  selector: 'app-contact-us-management',
  templateUrl: './contact-us-management.component.html',
  styleUrls: ['./contact-us-management.component.css']
})
export class ContactUsManagementComponent implements OnInit {

  edit = faEdit;
  phone = faPhone;
  info = faInfoCircle;
  users = faUsers

  contactUsForm = new FormGroup({
    phone: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
  })
  constructor(private contactUsService: ContactUsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactUsService.get().subscribe({
      next: (response) => {
        this.contactUsForm.setValue({
          email: response.content.emails || '',
          address: response.content.addresses || '',
          phone: response.content.phoneNumbers || '',
        })
      }
    })
  }

  get phones() {
    return this.contactUsForm.get('phone');
  }
  get addresses() {
    return this.contactUsForm.get('address');
  }
  get emails() {
    return this.contactUsForm.get('email');
  }

  update() {
    this.contactUsService.update(new ContactUs(this.addresses?.value, this.phones?.value, this.emails?.value))
      .subscribe({
        next: (response) => {
          this._snackBar.open(response.message, undefined, {
            duration: 1500,
            panelClass: ['success-snack-bar', 'panel-snack-bar'],
          });
        },
        error: (e) => {
          this._snackBar.open(e.error.message, undefined, {
            duration: 1500,
            panelClass: ['error-snack-bar', 'panel-snack-bar'],
          });
        }
      })
  }

}
