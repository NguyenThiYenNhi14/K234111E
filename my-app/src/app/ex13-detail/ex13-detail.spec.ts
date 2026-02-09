import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex13Detail } from './ex13-detail';

describe('Ex13Detail', () => {
  let component: Ex13Detail;
  let fixture: ComponentFixture<Ex13Detail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex13Detail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex13Detail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
