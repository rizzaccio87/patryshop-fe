import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BackOfficeComponent} from './components/back-office/back-office.component';


const routes: Routes = [{path: '', component: BackOfficeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
