import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatryShopRoutingModule} from './patry-shop-routing.module';
import {PatryShopComponent} from './components/patry-shop/patry-shop.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [PatryShopComponent],
  imports: [
    CommonModule,
    PatryShopRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class PatryShopModule {
}
