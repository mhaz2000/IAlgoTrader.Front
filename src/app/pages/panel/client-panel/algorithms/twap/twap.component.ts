import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIChart } from 'primeng/chart/chart';
import { SymbolModel } from 'src/app/models/symbol/symbol';
import { TWAP } from 'src/app/models/twap/twap';
import { TwapOrder } from 'src/app/models/twap/twapOrder';
import { TWAPRequest } from 'src/app/models/twap/twapRequest';
import { AlgorithmService } from 'src/app/services/algorithmService';
import { OrderService } from 'src/app/services/orderService';
import { TransactionService } from 'src/app/services/transactionService';

@Component({
  selector: 'app-twap',
  templateUrl: './twap.component.html',
  styleUrls: ['./twap.component.css']
})
export class TwapComponent implements OnInit {

  basicData: any;
  basicOptions: any;

  symbols: SymbolModel[] = [];
  twaps: TWAP[] = [];
  twapAmount: number | null = null;
  sharesNumber = 0;
  operationName = '';
  transactionDays = 0;
  operationType = 1;

  @ViewChild("chart") chart: UIChart | undefined;

  constructor(private algorithmService: AlgorithmService, private transactionService: TransactionService,
    private snackBar: MatSnackBar, private orderService: OrderService) { }

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
        }
      ]
    }
  }

  selectControl = new FormControl('', [Validators.required]);

  buyForm: FormGroup = new FormGroup({
    buyTransactionDays: new FormControl('', [Validators.min(1), Validators.required]),
    buyShareNumbers: new FormControl('', [Validators.min(1), Validators.required])
  })


  get buyTransactionDays() {
    return this.buyForm.get('buyTransactionDays');
  }
  get buyShareNumbers() {
    return this.buyForm.get('buyShareNumbers');
  }

  sellForm: FormGroup = new FormGroup({
    sellTransactionDays: new FormControl('', [Validators.min(1), Validators.required]),
    sellShareNumbers: new FormControl('', [Validators.min(1), Validators.required])
  })

  get sellTransactionDays() {
    return this.sellForm.get('sellTransactionDays');
  }

  get sellShareNumbers() {
    return this.sellForm.get('sellShareNumbers');
  }

  calculateTwap(operationType: number) {
    if (!this.selectControl.valid)
      this.snackBar.open("لطفا نماد مورد نظر را انتخاب کنید.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
    else {
      this.operationType = operationType;
      this.sharesNumber = operationType === 1 ? this.buyShareNumbers?.value : this.sellShareNumbers?.value;
      this.operationName = operationType === 1 ? 'خریداری' : 'فروخته';
      this.transactionDays = operationType === 1 ? this.buyTransactionDays?.value : this.sellTransactionDays?.value;

      this.algorithmService.calculateTWAP(new TWAPRequest(this.selectControl.value || '',
        operationType === 1 ? this.buyTransactionDays?.value : this.sellTransactionDays?.value))
        .subscribe({
          next: (response) => {
            this.twaps = [];
            response.content.averages.forEach((element: any) => {
              this.twaps.push(new TWAP(element.amount, element.date));
            });
            this.twapAmount = response.content.twapAmount
            this.basicData.datasets[0].data = [];
            this.basicData.datasets[0].data = this.twaps.map((c) => { return c.amount });
            this.basicData.labels = this.twaps.map((c) => { return c.date });

            this.chart?.reinit();
          }
        })
    }
  }

  sendOrder(operationType: number) {
    this.orderService
      .sendTwapOrder(new TwapOrder(operationType === 1 ? this.buyShareNumbers?.value : this.sellShareNumbers?.value,
        this.twapAmount || 0, operationType === 1 ? this.buyTransactionDays?.value : this.sellTransactionDays?.value,
        operationType, this.selectControl.value || '')).subscribe({
          next: (response) => {
            this.snackBar.open(response.message, undefined, {
              duration: 1500,
              panelClass: ['success-snack-bar', 'panel-snack-bar'],
            })
          }
        })
  }
}
