import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PatryShopComponent} from './components/patry-shop/patry-shop.component';


const routes: Routes = [{path: '', component: PatryShopComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatryShopRoutingModule {
}
