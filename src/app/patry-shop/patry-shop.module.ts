import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatryShopRoutingModule } from './patry-shop-routing.module';
import { PatryShopComponent } from './patry-shop.component';


@NgModule({
  declarations: [PatryShopComponent],
  imports: [
    CommonModule,
    PatryShopRoutingModule
  ]
})
export class PatryShopModule { }
