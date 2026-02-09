import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bitcoin } from './bitcoin';

describe('Bitcoin', () => {
  let component: Bitcoin;
  let fixture: ComponentFixture<Bitcoin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bitcoin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bitcoin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
