import { TestBed } from '@angular/core/testing';

import { ProductService13 } from './product-service13';

describe('ProductService13', () => {
  let service: ProductService13;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService13);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
