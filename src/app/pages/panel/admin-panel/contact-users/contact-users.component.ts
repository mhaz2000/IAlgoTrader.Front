import { Component, OnInit } from '@angular/core';
import { ContactUsForm } from 'src/app/models/contactUs/contactUsForm';
import { ContactUsService } from 'src/app/services/contactUsService';

@Component({
  selector: 'app-contact-users',
  templateUrl: './contact-users.component.html',
  styleUrls: ['./contact-users.component.css']
})
export class ContactUsersComponent implements OnInit {

  contactUsList: ContactUsForm[] = [];
  pageLength = 0;
  constructor(private contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.contactUsService.getForms(4, 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.contactUsList
            .push(new ContactUsForm(element.fullName, element.email, element.phoneNumber, element.title, element.description, element.date))
        });
      }
    })
  }

  pageSize = 4;
  pageChangeEvent(event: any) {
    this.contactUsService.getForms(4, event.pageIndex+1).subscribe({
      next: (response) => {
        this.contactUsList = [];
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.contactUsList
            .push(new ContactUsForm(element.fullName, element.email, element.phoneNumber, element.title, element.description, element.date))
        });
      }
    })
  }

}
