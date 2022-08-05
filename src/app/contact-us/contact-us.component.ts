import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faMailBulk, faPhone, faAddressBook, faFileText } from '@fortawesome/free-solid-svg-icons';


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

  constructor() { }

  ngOnInit(): void {
  }

  contactUsForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.maxLength(11),Validators.minLength(11)]),
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

}
