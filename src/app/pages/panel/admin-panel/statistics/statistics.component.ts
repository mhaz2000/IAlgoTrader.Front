import { Component, OnInit } from '@angular/core';
import { Statistics } from 'src/app/models/statistics/statistics';
import { TransactionService } from 'src/app/services/transactionService';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  statistics: Statistics | undefined;
  ngOnInit(): void {
    this.transactionService.getStatistics().subscribe({
      next: (response) => {
        this.statistics = new Statistics(response.content.usersCount, response.content.tradesCount,
          response.content.tradesPrice, response.content.tradesVolumes)
      }
    })
  }

}
