import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCreateCakeComponent } from './modal-create-cake.component';

describe('ModalCreateCakeComponent', () => {
  let component: ModalCreateCakeComponent;
  let fixture: ComponentFixture<ModalCreateCakeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateCakeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
