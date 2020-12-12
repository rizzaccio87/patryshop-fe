import {Component} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CakeService} from '../../../core/services/cake.service';
import {Cake} from '../../../core/interfaces/cake';

@Component({
  selector: 'app-modal-create-cake',
  templateUrl: './modal-create-cake.component.html'
})
export class ModalCreateCakeComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private cakeService: CakeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      ingredients: ['', [Validators.required]]
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onConfirm(): void {
    if (this.form.valid) {
      const cake = this.form.value as Cake;
      this.cakeService.addCake(cake).subscribe((res) => {
        this.modal.close(res);
      }, () => {
        this.modal.close(false);
      });
    }
  }
}
