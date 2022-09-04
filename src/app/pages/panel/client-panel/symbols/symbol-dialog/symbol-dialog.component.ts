import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionModel } from 'src/app/models/transaction/transactionModel';
import { TransactionService } from 'src/app/services/transactionService';

export interface DialogData {
  symbol: any
}

@Component({
  selector: 'app-symbol-dialog',
  templateUrl: './symbol-dialog.component.html',
  styleUrls: ['./symbol-dialog.component.css']
})
export class SymbolDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SymbolDialogComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  transactions: TransactionModel[] = [];
  pageLength = 0;
  pageSize = 10;

  displayedColumns: string[] = ['date', 'numberTrade', 'closePrice', 'lastPrice',
    'priceMin', 'priceMax', 'priceFirst'];
  dataSource: TransactionModel[] = [];


  ngOnInit(): void {
    this.transactionService.getSymbolTransactions(this.data.symbol.symbolId, 10, 1).subscribe({
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


    console.log(this.data)
  }


  pageChangeEvent(event: any) {
    this.transactions = [];
    this.transactionService.getSymbolTransactions(this.data.symbol.symbolId, 10, event.pageIndex + 1).subscribe({
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