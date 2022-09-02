import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models/trade/trade';
import { TradeService } from 'src/app/services/tradeService';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  dataSource: Trade[] = [];
  pageLength = 0;
  pageSize = 10;
  trades: Trade[] = [];
  displayedColumns: string[] = ['date', 'orderNumber', 'algorithmType', 'orderType', 'price', 'sellVolume', 'buyVolume'];

  constructor(private tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeService.getTrades(10, 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.trades
            .push(new Trade(element.id, element.sellVolume, element.buyVolume, element.price.toFixed(2),
              element.date, element.orderType, element.algorithmType, element.orderNumber))
        });
        this.dataSource = this.trades;
      }
    })
  }

  pageChangeEvent(event: any) {
    this.trades = [];
    this.tradeService.getTrades(10, event.pageIndex + 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.trades
            .push(new Trade(element.id, element.sellVolume, element.buyVolume, element.price.toFixed(2),
              element.date, element.orderType, element.algorithmType, element.orderNumber))
        });
        this.dataSource = this.trades;
      }
    })
  }

}
