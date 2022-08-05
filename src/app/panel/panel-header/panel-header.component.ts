import { Component, OnInit } from '@angular/core';
import { faBars, faSignOut, faHome } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.today = new Date().toLocaleString('fa').replace('،', ' ');
    }, 1000);
  }

  toggleMenu() {

  }
}
