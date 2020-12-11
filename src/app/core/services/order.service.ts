import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../interfaces/order';

@Injectable()
export class OrderService {

  private static RESOURCE = 'orders';
  private endpoint: string;

  constructor(private request: RequestService, private http: HttpClient) {
    this.endpoint = `${this.request.baseUrl}/${OrderService.RESOURCE}`;
  }

  loadOrders(): Observable<Order[]> {
    return this.http.get(`${this.endpoint}`).pipe(
      map((res) => {
        return (res || []) as Order[];
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
