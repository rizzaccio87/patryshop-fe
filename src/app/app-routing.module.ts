import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const AppRoutes: Routes = [
  {path: '', redirectTo: 'patry-shop', pathMatch: 'full'},
  {path: 'patry-shop', loadChildren: () => import('./patry-shop/patry-shop.module').then(m => m.PatryShopModule)},
  {path: 'back-office', loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
