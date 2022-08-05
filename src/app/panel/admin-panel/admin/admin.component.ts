import { Component, OnInit } from '@angular/core';
import { faEdit,faPhone,faInfoCircle,faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  edit = faEdit;
  phone = faPhone;
  info = faInfoCircle;
  users = faUsers

  constructor() { }

  ngOnInit(): void {
  }

}
