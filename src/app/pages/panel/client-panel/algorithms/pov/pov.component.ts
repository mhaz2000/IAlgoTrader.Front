import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIChart } from 'primeng/chart/chart';
import { POV } from 'src/app/models/pov/pov';
import { PovOrder } from 'src/app/models/pov/povOrder';
import { SymbolModel } from 'src/app/models/symbol/symbol';
import { AlgorithmService } from 'src/app/services/algorithmService';
import { OrderService } from 'src/app/services/orderService';
import { TransactionService } from 'src/app/services/transactionService';

@Component({
  selector: 'app-pov',
  templateUrl: './pov.component.html',
  styleUrls: ['./pov.component.css']
})
export class PovComponent implements OnInit {

  constructor(private transactionService: TransactionService, private algorithmService: AlgorithmService,
    private snackBar: MatSnackBar, private orderService: OrderService) { }

  @ViewChild("chart") chart: UIChart | undefined;

  selectControl = new FormControl('', [Validators.required]);

  basicData: any;
  basicOptions: any;
  symbols: SymbolModel[] = [];
  povs: POV[] = [];

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
          label: 'درصد حجمی',
          data: [],
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    }
  }

  buyForm: FormGroup = new FormGroup({
    buySharesNumber: new FormControl('', [Validators.min(1), Validators.required]),
    buyPercentage: new FormControl('', [Validators.min(1), Validators.max(100), Validators.required]),
  })

  sellForm: FormGroup = new FormGroup({
    sellSharesNumber: new FormControl('', [Validators.min(1), Validators.required]),
    sellPercentage: new FormControl('', [Validators.min(1), Validators.max(100), Validators.required]),
  })

  get buyPercentage() {
    return this.buyForm.get('buyPercentage');
  }

  get buySharesNumber() {
    return this.buyForm.get('buySharesNumber');
  }

  get sellSharesNumber() {
    return this.sellForm.get('sellSharesNumber');
  }

  get sellPercentage() {
    return this.sellForm.get('sellPercentage');
  }

  SymbolSelected(event: string) {
    this.algorithmService.getTradeNumbers(event).subscribe({
      next: (response) => {
        this.povs = [];
        response.content.tradeNumbers.forEach((data: any) => {
          this.povs.push(new POV(data.date, data.tradeNumber))
        })
        this.basicData.datasets[0].data = [];
        this.basicData.datasets[0].data = this.povs.map((c) => { return c.tradeNumber });
        this.basicData.labels = this.povs.map((c) => { return c.date });

        this.chart?.reinit();
      }
    })
  }

  orderCommand(operationType: number) {
    if (!this.selectControl.valid)
      this.snackBar.open("لطفا نماد مورد نظر را انتخاب کنید.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
    else {
      this.orderService
        .sendPovOrder(new PovOrder(operationType === 1 ? this.buySharesNumber?.value : this.sellSharesNumber?.value,
          operationType === 1 ? this.buyPercentage?.value : this.sellPercentage?.value,
          this.selectControl.value || '', operationType)).subscribe({
            next: (response) => {
              this.snackBar.open(response.message, undefined, {
                duration: 1500,
                panelClass: ['success-snack-bar', 'panel-snack-bar'],
              })
            }
          })
    }
  }
}
