import { TestBed } from '@angular/core/testing';

import { FromCheckService } from './from-check.service';

describe('FromCheckService', () => {
  let service: FromCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
