import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduct19 } from './list-product19';

describe('ListProduct19', () => {
  let component: ListProduct19;
  let fixture: ComponentFixture<ListProduct19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProduct19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduct19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
