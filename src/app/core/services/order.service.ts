import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../interfaces/order';
import {GridColumn} from '../../shared/interfaces/grid';
import {Action} from '../../shared/interfaces/action';
// @ts-ignore
import moment from 'moment';

@Injectable()
export class OrderService {

  public static GRID_COLUMNS: GridColumn[] = [{
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

  public static GRID_ACTIONS: Action[] = [{
    label: 'Modifica',
    type: 'update'
  }, {
    label: 'Rimuovi',
    type: 'remove'
  }];

  private static RESOURCE = 'orders';
  private endpoint: string;

  constructor(private request: RequestService, private http: HttpClient) {
    this.endpoint = `${this.request.baseUrl}/${OrderService.RESOURCE}`;
  }

  loadOrders(): Observable<Order[]> {
    return this.http.get(`${this.endpoint}`).pipe(
      map((res: any[]) => {
        return (res.map(item => {
          return {
            ...item,
            creationTimestamp: moment(item.creationTimestamp).format('DD/MM/YYYY')
          };
        }) || []) as Order[];
      }));
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get(`${this.endpoint}/${id}`).pipe(
      map((res) => {
        return res as Order;
      }));
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post(`${this.endpoint}`, order).pipe(
      map((res) => {
        return res as Order;
      }));
  }

  updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put(`${this.endpoint}/${id}`, order).pipe(
      map((res) => {
        return res as Order;
      }));
  }

  removeOrder(id: string): Observable<boolean> {
    return this.http.delete(`${this.endpoint}/${id}`).pipe(
      map((res) => {
        return res as boolean;
      }));
  }
}
