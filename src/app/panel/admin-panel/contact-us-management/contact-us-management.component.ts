import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEdit,faPhone,faInfoCircle,faUsers } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
