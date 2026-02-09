import { TestBed } from '@angular/core/testing';

import { Book50 } from './book50';

describe('Book50', () => {
  let service: Book50;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Book50);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
