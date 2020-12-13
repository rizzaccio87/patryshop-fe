import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateOrderComponent } from './modal-create-order.component';

describe('ModalCreateOrderComponent', () => {
  let component: ModalCreateOrderComponent;
  let fixture: ComponentFixture<ModalCreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
