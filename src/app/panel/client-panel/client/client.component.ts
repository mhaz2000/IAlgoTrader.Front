import { Component, OnInit } from '@angular/core';
import { faEdit,faChartColumn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  chartBar = faChartColumn;
  edit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}
