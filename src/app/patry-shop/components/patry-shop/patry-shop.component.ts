import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../core/services/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../../core/interfaces/order';
import {GridColumn} from '../../../shared/interfaces/grid';
// @ts-ignore
import moment from 'moment';

@Component({
  selector: 'app-patry-shop',
  templateUrl: './patry-shop.component.html',
  styleUrls: ['./patry-shop.component.scss']
})
export class PatryShopComponent implements OnInit {

  constructor(private orderService: OrderService) {
    this.columns = OrderService.GRID_COLUMNS;
  }

  public orders$: Observable<Order[]>;
  public columns: GridColumn[] = [];

  ngOnInit(): void {
    this.orders$ = this.orderService.loadOrders(true);
  }
}
