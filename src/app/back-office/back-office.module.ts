import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackOfficeRoutingModule} from './back-office-routing.module';
import {BackOfficeComponent} from './components/back-office/back-office.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {BackOfficeTabComponent} from './components/back-office-tab/back-office-tab.component';
import {NzButtonModule} from 'ng-zorro-antd/button';


@NgModule({
  declarations: [BackOfficeComponent, BackOfficeTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzButtonModule,
    NzModalModule,
    CoreModule,
    SharedModule
  ]
})
export class BackOfficeModule {
}
