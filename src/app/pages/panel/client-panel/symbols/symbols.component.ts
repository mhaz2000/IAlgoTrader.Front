import { Component, OnInit } from '@angular/core';
import { TransactionModel } from 'src/app/models/transaction/transactionModel';
import { TransactionService } from 'src/app/services/transactionService';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent implements OnInit {


  transactions: TransactionModel[] = [];
  pageLength = 0;
  pageSize = 10;


  displayedColumns: string[] = ['symbolName', 'date', 'numberTrade', 'closePrice', 'lastPrice',
    'priceMin', 'priceMax', 'priceFirst'];

  constructor(private transactionService: TransactionService) { }
  dataSource: TransactionModel[] = [];


  ngOnInit(): void {
    this.transactionService.get(10, 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.transactions
            .push(new TransactionModel(element.id, element.symbolId, element.date, element.symbolName,
              element.numberTrade, element.closePrice, element.lastPrice, element.priceMin, element.priceMax,
              element.priceFirst))
        });
        this.dataSource = this.transactions;
      }
    })
  }

  pageChangeEvent(event: any) {
    this.transactions = [];
    this.transactionService.get(10, event.pageIndex + 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.transactions
            .push(new TransactionModel(element.id, element.symbolId, element.date, element.symbolName,
              element.numberTrade, element.closePrice, element.lastPrice, element.priceMin, element.priceMax,
              element.priceFirst))
        });

        this.dataSource = this.transactions;
      }
    })
  }
}