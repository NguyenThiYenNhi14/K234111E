import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Serviceproduct19 } from './serviceproduct19';

describe('Serviceproduct19', () => {
  let component: Serviceproduct19;
  let fixture: ComponentFixture<Serviceproduct19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Serviceproduct19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Serviceproduct19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
