import { Injectable } from '@angular/core';
import {RequestService} from './request.service';
import {HttpClient} from '@angular/common/http';
import {Cake} from '../interfaces/cake';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CakeService {

  private static RESOURCE = 'cakes';
  private endpoint: string;

  constructor(private request: RequestService, private http: HttpClient) {
    this.endpoint = `${this.request.baseUrl}/${CakeService.RESOURCE}`;
  }

  loadCakes(): Observable<Cake[]> {
    return this.http.get(`${this.endpoint}`).pipe(
      map((res) => {
          return (res || []) as Cake[];
      }));
  }

  getCake(id: string): Observable<Cake> {
    return this.http.get(`${this.endpoint}/${id}`).pipe(
      map((res) => {
        return res as Cake;
      }));
  }

  addCake(cake: Cake): Observable<Cake> {
    return this.http.post(`${this.endpoint}`, cake).pipe(
      map((res) => {
        return res as Cake;
      }));
  }

  updateCake(id: string, cake: Cake): Observable<Cake> {
    return this.http.put(`${this.endpoint}/${id}`, cake).pipe(
      map((res) => {
        return res as Cake;
      }));
  }

  removeCake(id: string): Observable<boolean> {
    return this.http.delete(`${this.endpoint}/${id}`).pipe(
      map((res) => {
        return res as boolean;
      }));
  }

}
