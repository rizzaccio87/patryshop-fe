import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackOfficeRoutingModule} from './back-office-routing.module';
import {BackOfficeComponent} from './components/back-office/back-office.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {NzTabsModule} from 'ng-zorro-antd/tabs';


@NgModule({
  declarations: [BackOfficeComponent],
  imports: [
    CommonModule,
    FormsModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    NzTabsModule,
    CoreModule,
    SharedModule
  ]
})
export class BackOfficeModule {
}
