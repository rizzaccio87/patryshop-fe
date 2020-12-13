import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeTabComponent } from './back-office-tab.component';

describe('BackOfficeCakesTabComponent', () => {
  let component: BackOfficeTabComponent;
  let fixture: ComponentFixture<BackOfficeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackOfficeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
