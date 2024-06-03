import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcommerceComponent } from './admin-ecommerce.component';

describe('AdminEcommerceComponent', () => {
  let component: AdminEcommerceComponent;
  let fixture: ComponentFixture<AdminEcommerceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEcommerceComponent]
    });
    fixture = TestBed.createComponent(AdminEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
