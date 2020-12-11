import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CakeService} from './services/cake.service';
import {OrderService} from './services/order.service';
import {HttpClientModule} from '@angular/common/http';
import {RequestService} from './services/request.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RequestService,
    CakeService,
    OrderService
  ]
})
export class CoreModule {
}
