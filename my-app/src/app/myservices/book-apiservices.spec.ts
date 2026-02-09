import { TestBed } from '@angular/core/testing';

import { BookAPIServices } from './book-apiservices';

describe('BookAPIServices', () => {
  let service: BookAPIServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookAPIServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
