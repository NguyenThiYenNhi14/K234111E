import { TestBed } from '@angular/core/testing';

import { CustomerService18 } from './customer-service18';

describe('CustomerService18', () => {
  let service: CustomerService18;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService18);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
