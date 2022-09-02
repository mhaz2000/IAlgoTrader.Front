import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faSignOut, faHome } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'src/app/services/cookieService';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent implements OnInit {

  bars = faBars;
  signOut = faSignOut;
  home = faHome;
  today: string = new Date().toLocaleString('fa').replace('،', ' ');
  firstName: string = '';
  lastName: string = '';

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.firstName = response.content.firstName;
        this.lastName = response.content.lastName;
      }
    })

    setInterval(() => {
      this.today = new Date().toLocaleString('fa').replace('،', ' ');
    }, 1000);
  }

  navigateToWebsite() {
    this.router.navigate(['website'])
  }

  logout() {
    this.cookieService.deleteCookie('authToken');
    this.router.navigate(['signIn'])
  }

  toggleMenu() {

  }
}
