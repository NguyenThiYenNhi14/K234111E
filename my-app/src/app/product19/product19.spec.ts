import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product19 } from './product19';

describe('Product19', () => {
  let component: Product19;
  let fixture: ComponentFixture<Product19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Product19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
