import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatryShopComponent } from './patry-shop.component';

describe('PatryShopComponent', () => {
  let component: PatryShopComponent;
  let fixture: ComponentFixture<PatryShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatryShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatryShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
