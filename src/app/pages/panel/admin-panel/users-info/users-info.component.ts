import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone'];

  users: UserModel[] = [];
  pageLength = 0;
  pageSize = 10;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(10, 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.users
            .push(new UserModel(element.firstName, element.lastName, element.email, element.phone))
        });

        this.dataSource = this.users;
      }
    })
  }

  dataSource: UserModel[] = [];

  pageChangeEvent(event:any){
    this.users = [];
    this.userService.getUsers(10, event.pageIndex+1).subscribe({
      next: (response) => {
        debugger
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.users
            .push(new UserModel(element.firstName, element.lastName, element.email, element.phone))
        });

        this.dataSource = this.users;
      }
    })
  }

}
