import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CoreModule} from '../core/core.module';
import {GridComponent} from './components/grid/grid.component';
import {NzDividerModule} from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    CoreModule
  ],
  exports: [GridComponent]
})
export class SharedModule {
}
