import { Component, OnInit } from '@angular/core';
import { faEdit, faPhone, faInfoCircle, faUsers, faContactCard, faBarChart } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  edit = faEdit;
  phone = faPhone;
  info = faInfoCircle;
  users = faUsers;
  contact = faContactCard;
  chart = faBarChart;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isAdmin().subscribe();
  }

}
