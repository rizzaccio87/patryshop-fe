import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzTableModule} from 'ng-zorro-antd/table';
import {CoreModule} from '../core/core.module';
import {GridComponent} from './components/grid/grid.component';


@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    NzTableModule,
    CoreModule
  ],
  exports: [GridComponent]
})
export class SharedModule {
}
