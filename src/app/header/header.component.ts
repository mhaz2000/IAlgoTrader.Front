import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
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

}
