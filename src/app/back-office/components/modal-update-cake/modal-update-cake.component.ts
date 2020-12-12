import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {CakeService} from '../../../core/services/cake.service';
import {Cake} from '../../../core/interfaces/cake';

@Component({
  selector: 'app-modal-update-cake',
  templateUrl: './modal-update-cake.component.html',
  styleUrls: ['./modal-update-cake.component.scss']
})
export class ModalUpdateCakeComponent implements OnInit {

  public form: FormGroup;
  public id: string;
  public readonly: boolean;
  public submitLabel: string;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private cakeService: CakeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      ingredients: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.cakeService.getCake(this.id).subscribe((cake) => {
      this.form.get('name').setValue(cake.name);
      this.form.get('price').setValue(cake.price);
      this.form.get('ingredients').setValue(cake.ingredients);
    });
    this.submitLabel = (this.readonly) ? 'Chiudi' : 'Aggiorna';
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  onConfirm(): void {
    if (!this.readonly) {
      // update
      if (this.form.valid) {
        const cake = this.form.value as Cake;
        this.cakeService.updateCake(this.id, cake).subscribe((res) => {
          this.modal.close(res);
        }, () => {
          this.modal.close(false);
        });
      }
    } else {
      // view
      this.modal.close();
    }
  }

}
