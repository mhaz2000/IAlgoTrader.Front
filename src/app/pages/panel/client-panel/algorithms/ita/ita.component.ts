import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as e from 'express';
import { ItaBuyOrder, ItaOrder, ItaSellOrder } from 'src/app/models/ita/itaOrder';
import { SymbolModel } from 'src/app/models/symbol/symbol';
import { OrderService } from 'src/app/services/orderService';
import { TransactionService } from 'src/app/services/transactionService';

@Component({
  selector: 'app-ita',
  templateUrl: './ita.component.html',
  styleUrls: ['./ita.component.css']
})
export class ItaComponent implements OnInit {

  constructor(private transactionService: TransactionService,
    private snackBar: MatSnackBar, private orderService: OrderService) { }

  symbols: SymbolModel[] = [];
  selectControl = new FormControl('', [Validators.required]);
  buyActiveness = true;
  sellActiveness = true;

  buyForm: FormGroup = new FormGroup({
    buySharesNumber: new FormControl('', [Validators.min(1)]),
    buyDailyShares: new FormControl('', [Validators.min(1), Validators.required]),
    buyStartAmount: new FormControl('', [Validators.min(1), Validators.required]),
    buyStopAmount: new FormControl('', [Validators.min(1), Validators.required]),
  })

  sellForm: FormGroup = new FormGroup({
    sellSharesNumber: new FormControl('', [Validators.min(1)]),
    sellDailyShares: new FormControl('', [Validators.min(1), Validators.required]),
    sellStartAmount: new FormControl('', [Validators.min(1), Validators.required]),
    sellStopAmount: new FormControl('', [Validators.min(1), Validators.required]),
  })

  get buyStartAmount() {
    return this.buyForm.get('buyStartAmount');
  }

  get buySharesNumber() {
    return this.buyForm.get('buySharesNumber');
  }

  get buyDailyShares() {
    return this.buyForm.get('buyDailyShares');
  }

  get buyStopAmount() {
    return this.buyForm.get('buyStopAmount');
  }

  get sellSharesNumber() {
    return this.sellForm.get('sellSharesNumber');
  }

  get sellStartAmount() {
    return this.sellForm.get('sellStartAmount');
  }

  get sellDailyShares() {
    return this.sellForm.get('sellDailyShares');
  }

  get sellStopAmount() {
    return this.sellForm.get('sellStopAmount');
  }

  ngOnInit(): void {
    this.transactionService.getSymbols().subscribe({
      next: (response) => {
        response.content.forEach((symbol: any) => {
          this.symbols.push(new SymbolModel(symbol.symbolName, symbol.id));
        })
      }
    })
  }

  buyActivenessStatus(event: any) {
    if (!event.checked) {
      this.buyForm.controls['buyStartAmount'].disable();
      this.buyForm.controls['buyStopAmount'].disable();
      this.buyForm.controls['buySharesNumber'].disable();
      this.buyForm.controls['buyDailyShares'].disable();
      this.buyActiveness = false;
    }
    else {
      this.buyForm.controls['buyStartAmount'].enable();
      this.buyForm.controls['buyStopAmount'].enable();
      this.buyForm.controls['buySharesNumber'].enable();
      this.buyForm.controls['buyDailyShares'].enable();
      this.buyActiveness = true;
    }
  }

  sellActivenessStatus(event: any) {
    if (!event.checked) {
      this.sellForm.controls['sellStartAmount'].disable();
      this.sellForm.controls['sellStopAmount'].disable();
      this.sellForm.controls['sellSharesNumber'].disable();
      this.sellForm.controls['sellDailyShares'].disable();
      this.sellActiveness = false;
    }
    else {
      this.sellForm.controls['sellStartAmount'].enable();
      this.sellForm.controls['sellStopAmount'].enable();
      this.sellForm.controls['sellSharesNumber'].enable();
      this.sellForm.controls['sellDailyShares'].enable();
      this.sellActiveness = true;
    }
  }

  sendOrders() {
    if (this.inputValidation())
      this.orderService.sendItaOrder(new ItaOrder(this.selectControl.value || '', this.buyActiveness ?
        new ItaBuyOrder(this.buyStartAmount?.value, this.buyStopAmount?.value, this.buyDailyShares?.value, this.buySharesNumber?.value) : null,
        this.sellActiveness ? new ItaSellOrder(this.sellStartAmount?.value, this.sellStopAmount?.value, this.sellDailyShares?.value, this.sellSharesNumber?.value) : null))
        .subscribe({
          next: (response) => {
            this.snackBar.open(response.message, undefined, {
              duration: 1500,
              panelClass: ['success-snack-bar', 'panel-snack-bar'],
            })
          }
        })
  }

  inputValidation(): boolean {
    if (!this.selectControl.valid) {
      this.snackBar.open("لطفا نماد مورد نظر را انتخاب کنید.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
      return false;
    }

    if(this.buyStartAmount?.value && this.buyStopAmount?.value && this.buyStartAmount.value >= this.buyStopAmount.value)
    {
      this.snackBar.open("حد پایان خرید باید از حد شروع بیشتر باشد.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
      return false;
    }

    if(this.sellStartAmount?.value && this.sellStopAmount?.value && this.sellStartAmount.value >= this.sellStopAmount.value)
    {
      this.snackBar.open("حد پایان فروش باید از حد شروع بیشتر باشد.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
      return false;
    }

    if (this.buyActiveness && this.buySharesNumber?.value && this.buyDailyShares?.value > this.buySharesNumber?.value) {
      this.snackBar.open("حداکثر سهم خرید نمی تواند از سهم خرید روزانه کمتر باشد.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
      return false;
    }

    if (this.sellActiveness && this.sellSharesNumber?.value && this.sellDailyShares?.value > this.sellSharesNumber?.value) {
      this.snackBar.open("حداکثر سهم فروش نمی تواند از سهم فروش روزانه کمتر باشد.", undefined, {
        duration: 1500,
        panelClass: ['error-snack-bar', 'panel-snack-bar'],
      });
      return false;
    }

    return true;
  }
}
