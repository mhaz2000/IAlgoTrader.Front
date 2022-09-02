import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIChart } from 'primeng/chart/chart';
import { SymbolModel } from 'src/app/models/symbol/symbol';
import { VWAP } from 'src/app/models/vwap/vwap';
import { VWAPOrder } from 'src/app/models/vwap/vwapOrder';
import { AlgorithmService } from 'src/app/services/algorithmService';
import { OrderService } from 'src/app/services/orderService';
import { TransactionService } from 'src/app/services/transactionService';


@Component({
  selector: 'app-vwap',
  templateUrl: './vwap.component.html',
  styleUrls: ['./vwap.component.css']
})
export class VWAPComponent implements OnInit {

  @ViewChild("chart") chart: UIChart | undefined;

  selectControl = new FormControl('', [Validators.required]);

  basicData: any;

  basicOptions: any;

  symbols: SymbolModel[] = [];
  vwaps: VWAP[] = [];

  constructor(private transactionService: TransactionService, private orderService: OrderService,
    private snackBar: MatSnackBar, private algorithmService: AlgorithmService) { }

  operationForm: FormGroup = new FormGroup({
    volume: new FormControl('', [Validators.min(1), Validators.required]),
    percentage: new FormControl('', [Validators.min(1), Validators.max(100), Validators.required])
  })

  get volume() {
    return this.operationForm.get('volume');
  }
  get percentage() {
    return this.operationForm.get('percentage');
  }

  ngOnInit(): void {
    this.transactionService.getSymbols().subscribe({
      next: (response) => {
        response.content.forEach((symbol: any) => {
          this.symbols.push(new SymbolModel(symbol.symbolName, symbol.id));
        })
      }
    })


    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'میانگین موزون حجم قیمت',
          data: [],
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'قیمت واقعی',
          data: [],
          fill: true,
          borderColor: '#2e2e2e',
          tension: .4
        }
      ]
    }
  }

  SymbolSelected(event: string) {
    this.algorithmService.calculateVWAP(event).subscribe({
      next: (response) => {
        this.vwaps = [];
        response.content.vwaPs.forEach((data: any) => {
          this.vwaps.push(new VWAP(data.date, data.amount, data.closePrice))
        })
        this.basicData.datasets[0].data = [];
        this.basicData.datasets[1].data = [];
        this.basicData.datasets[0].data = this.vwaps.map((c) => { return c.amount });
        this.basicData.datasets[1].data = this.vwaps.map((c) => { return c.closePrice });
        this.basicData.labels = this.vwaps.map((c) => { return c.date });

        this.chart?.reinit();
      }
    })
  }

  orderCommand() {
    if (!this.selectControl.valid)
      this.snackBar.open("لطفا نماد مورد نظر را انتخاب کنید.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
    else
      this.orderService
        .sendVwapOrder(new VWAPOrder(this.volume?.value, this.percentage?.value, 0, this.selectControl.value || ''))
        .subscribe({
          next: (response) => {
            this.snackBar.open(response.message, undefined, {
              duration: 1500,
              panelClass: ['success-snack-bar', 'panel-snack-bar'],
            })
          }
        })
  }
}
