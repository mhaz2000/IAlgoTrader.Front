import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order/orderModel';
import { OrderService } from 'src/app/services/orderService';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders(10, 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.orders
            .push(new OrderModel(element.date, element.algorithmType, element.orderType, element.symbolName,
              element.isActive, element.isCompleted, element.orderNumber))
        });
        this.dataSource = this.orders;
      }
    })
  }

  check = faCheck;
  xMark = faXmark;
  displayedColumns: string[] = ['date', 'orderNumber', 'algorithmType', 'orderType', 'symbolName', 'isActive', 'isCompleted'];
  orders: OrderModel[] = [];
  pageLength = 0;
  pageSize = 10;

  dataSource: OrderModel[] = [];

  pageChangeEvent(event: any) {
    this.orders = [];
    this.orderService.getOrders(10, event.pageIndex + 1).subscribe({
      next: (response) => {
        this.pageLength = response.total;
        response.content.forEach((element: any) => {
          this.orders
            .push(new OrderModel(element.date, element.algorithmType, element.orderType,
              element.symbolName, element.isActive, element.isCompleted, element.orderNumber))
        });
        this.dataSource = this.orders;
      }
    })
  }
}
