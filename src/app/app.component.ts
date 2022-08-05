import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IAlgoTrader';
  constructor(private router: Router) {

  }

  isInPanel: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
        this.isInPanel = this.router.url.includes('admin') || this.router.url.includes('client')
    })
  }
}
