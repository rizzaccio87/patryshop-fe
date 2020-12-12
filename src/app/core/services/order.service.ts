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

  public static DATE_FORMAT = 'DD/MM/YYYY';
  private static RESOURCE = 'orders';
  private endpoint: string;

  constructor(private request: RequestService, private http: HttpClient) {
    this.endpoint = `${this.request.baseUrl}/${OrderService.RESOURCE}`;
  }

  public static calculatePrice(order: Order): number {
    let price = order.price;
    const delta = moment().diff(order.creationTimestamp, 'days');
    switch (delta) {
      case 0:
        price = order.price;
        break;
      case 1:
        price = order.price * 0.8;
        break;
      case 2:
        price = order.price * 0.2;
    }

    return price;
  }

  loadOrders(calculatePrice?: boolean): Observable<Order[]> {
    return this.http.get(`${this.endpoint}`).pipe(
      map((res: any[]) => {
        let orders = (res || []) as Order[];

        if (calculatePrice) {
          orders = res.filter(order => {
            return moment().diff(order.creationTimestamp, 'days') < 3;
          }).map(order => {
            return {
              ...order,
              price: OrderService.calculatePrice(order)
            };
          });
        }

        return orders.map(order => {
          return {
            ...order,
              creationTimestamp: moment(order.creationTimestamp).format(OrderService.DATE_FORMAT)
          };
        });
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
