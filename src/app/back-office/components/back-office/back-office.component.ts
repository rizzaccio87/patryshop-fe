import {Component, OnInit} from '@angular/core';
import {CakeService} from '../../../core/services/cake.service';
import {OrderService} from '../../../core/services/order.service';
import {Cake} from '../../../core/interfaces/cake';
import {Observable} from 'rxjs';
import {Order} from '../../../core/interfaces/order';
import {GridColumn} from '../../../shared/interfaces/grid';
import {Action} from '../../../shared/interfaces/action';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {
  public cakes$: Observable<Cake[]>;
  public orders$: Observable<Order[]>;
  public orderColumns: GridColumn[];
  public cakeColumns: GridColumn[];
  public orderActions: Action[];
  public cakeActions: Action[];

  constructor(private cakeService: CakeService, private orderService: OrderService) {
    this.orderColumns = [{
      field: 'creationTimestamp',
      title: 'Data'
    }, {
      field: 'cakeName',
      title: 'Torta'
    }, {
      field: 'amount',
      title: 'Disponibilità'
    }, {
      field: 'price',
      title: 'Prezzo'
    }];

    this.cakeColumns = [{
      field: 'name',
      title: 'Nome Torta'
    }, {
      field: 'price',
      title: 'Prezzo'
    }];

    this.orderActions = this.cakeActions = [{
      label: 'Aggiorna',
      type: 'update'
    }, {
      label: 'Rimuovi',
      type: 'remove'
    }];
  }

  ngOnInit(): void {
    this.cakes$ = this.cakeService.loadCakes();
    this.orders$ = this.orderService.loadOrders();
  }

}
