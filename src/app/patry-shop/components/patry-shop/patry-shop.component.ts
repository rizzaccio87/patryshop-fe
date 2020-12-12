import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../core/services/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../../core/interfaces/order';
import {GridColumn} from '../../../shared/interfaces/grid';

@Component({
  selector: 'app-patry-shop',
  templateUrl: './patry-shop.component.html',
  styleUrls: ['./patry-shop.component.scss']
})
export class PatryShopComponent implements OnInit {

  public orders$: Observable<Order[]>;
  public columns: GridColumn[] = [];

  constructor(private orderService: OrderService) {
    this.columns = [{
      field: 'creationTimestamp',
      title: 'Data'
    }, {
      field: 'cakeName',
      title: 'Dolce'
    }, {
      field: 'amount',
      title: 'Disponibilità'
    }, {
      field: 'price',
      title: 'Prezzo'
    }];
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.loadOrders();
  }

}
