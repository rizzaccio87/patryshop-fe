import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateOrderComponent } from './modal-update-order.component';

describe('ModalUpdateOrderComponent', () => {
  let component: ModalUpdateOrderComponent;
  let fixture: ComponentFixture<ModalUpdateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
