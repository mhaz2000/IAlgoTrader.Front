import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'src/app/services/cookieService';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bars = faBars;
  menuOpen = false;
  close = faClose;
  hideMenu = false;

  isLoggedIn = false;
  isAdmin = false;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe({
      next: () => {
        this.isLoggedIn = true;
      },
      error: (e) => {
        if (e.status == 401)
          this.isLoggedIn = false;
      }
    })

    this.userService.isAdmin().subscribe({
      next: () => {
        this.isAdmin = true;
      },
      error: (e) => {
        if (e.status == 403)
          this.isAdmin = false;
      }
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd || event instanceof NavigationStart)
        if (event.url.includes('signUp') || event.url.includes('signIn')
          || event.url.includes('admin') || event.url.includes('client'))
          this.hideMenu = true;
        else
          this.hideMenu = false;
    })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.cookieService.deleteCookie('authToken');
  }
}
