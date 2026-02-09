import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeProduct2 } from './fake-product2';

describe('FakeProduct2', () => {
  let component: FakeProduct2;
  let fixture: ComponentFixture<FakeProduct2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeProduct2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeProduct2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
