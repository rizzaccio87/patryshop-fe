import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {OrderService} from '../../../core/services/order.service';
import {Order} from '../../../core/interfaces/order';
import {Cake} from '../../../core/interfaces/cake';
import {CakeService} from '../../../core/services/cake.service';

@Component({
  selector: 'app-modal-create-order',
  templateUrl: './modal-create-order.component.html',
  styleUrls: ['./modal-create-order.component.scss']
})
export class ModalCreateOrderComponent {

  public form: FormGroup;
  public cakes: Cake[];

  constructor(private fb: FormBuilder, private modal: NzModalRef, private orderService: OrderService, private cakeService: CakeService) {
    this.cakeService.loadCakes().subscribe(cakes => this.cakes = cakes);
    this.form = this.fb.group({
      cakeId: [null, [Validators.required]],
      amount: [0, [Validators.required]]
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onConfirm(): void {
    if (this.form.valid) {
      const order = this.form.value as Order;
      this.orderService.addOrder(order).subscribe((res) => {
        this.modal.close(res);
      }, () => {
        this.modal.close(false);
      });
    }
  }

}
