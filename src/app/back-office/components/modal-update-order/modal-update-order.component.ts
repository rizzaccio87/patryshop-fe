import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cake} from '../../../core/interfaces/cake';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {OrderService} from '../../../core/services/order.service';
import {CakeService} from '../../../core/services/cake.service';
import {Order} from '../../../core/interfaces/order';

@Component({
  selector: 'app-modal-update-order',
  templateUrl: './modal-update-order.component.html',
  styleUrls: ['./modal-update-order.component.scss']
})
export class ModalUpdateOrderComponent implements OnInit {

  public form: FormGroup;
  public cakes: Cake[];
  public id: string;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private orderService: OrderService, private cakeService: CakeService) {
    this.cakeService.loadCakes().subscribe(cakes => this.cakes = cakes);
    this.form = this.fb.group({
      cakeId: [null, [Validators.required]],
      amount: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.orderService.getOrder(this.id).subscribe((order) => {
      this.form.get('cakeId').setValue(order.cakeId);
      this.form.get('amount').setValue(order.amount);
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onConfirm(): void {
    if (this.form.valid) {
      const order = this.form.value as Order;
      this.orderService.updateOrder(this.id, order).subscribe((res) => {
        this.modal.close(res);
      }, () => {
        this.modal.close(false);
      });
    }
  }

}
