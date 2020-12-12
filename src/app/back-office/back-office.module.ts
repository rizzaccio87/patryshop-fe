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
import {ModalCreateCakeComponent} from './components/modal-create-cake/modal-create-cake.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ModalUpdateCakeComponent} from './components/modal-update-cake/modal-update-cake.component';
import {ModalCreateOrderComponent} from './components/modal-create-order/modal-create-order.component';
import {ModalUpdateOrderComponent} from './components/modal-update-order/modal-update-order.component';
import {NzSelectModule} from 'ng-zorro-antd/select';


@NgModule({
  declarations: [BackOfficeComponent, BackOfficeTabComponent, ModalCreateCakeComponent, ModalUpdateCakeComponent, ModalCreateOrderComponent, ModalUpdateOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CoreModule,
    SharedModule
  ]
})
export class BackOfficeModule {
}
