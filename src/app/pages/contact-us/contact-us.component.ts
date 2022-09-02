import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faMailBulk, faPhone, faAddressBook, faFileText } from '@fortawesome/free-solid-svg-icons';
import { ContactUsForm } from 'src/app/models/contactUs/contactUsForm';
import { ContactUs } from 'src/app/models/contactUs/contactUsUpdate';
import { ContactUsService } from 'src/app/services/contactUsService';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  faMail = faMailBulk;
  faAddress = faAddressBook;
  faPhone = faPhone;
  faText = faFileText;

  contactUs: ContactUs | undefined;

  constructor(private contactUsService: ContactUsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactUsService.get().subscribe({
      next: (response) => {
        this.contactUs = new ContactUs(response.content.addresses, response.content.phoneNumbers, response.content.emails)
      }
    })
  }

  contactUsForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.maxLength(11), Validators.minLength(11)]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })


  get fullName() {
    return this.contactUsForm.get('fullName');
  }
  get email() {
    return this.contactUsForm.get('email');
  }
  get description() {
    return this.contactUsForm.get('description');
  }
  get title() {
    return this.contactUsForm.get('title');
  }
  get phone() {
    return this.contactUsForm.get('phone');
  }


  Send() {
    this.contactUsService.sendForm(new ContactUsForm(this.fullName?.value || '', this.email?.value || '',
      this.phone?.value || '', this.title?.value || '', this.description?.value || '', ''))
      .subscribe({
        next: (response: any) => {
          this.contactUsForm.setValue({
            fullName: '',
            email: '',
            phone: '',
            title: '',
            description: ''
          });
          this._snackBar.open(response.message, undefined, {
            duration: 2000,
            panelClass: ['success-snack-bar'],
          })
        },
        error: (e) => {
          this._snackBar.open(e.error.message, undefined, {
            duration: 2000,
            panelClass: ['error-snack-bar'],
          })
        }
      })
  }
}
