import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateCakeComponent } from './modal-update-cake.component';

describe('ModalUpdateCakeComponent', () => {
  let component: ModalUpdateCakeComponent;
  let fixture: ComponentFixture<ModalUpdateCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateCakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
