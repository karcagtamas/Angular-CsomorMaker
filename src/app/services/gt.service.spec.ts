import { TestBed } from '@angular/core/testing';

import { GtService } from './gt.service';

describe('GtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtService = TestBed.get(GtService);
    expect(service).toBeTruthy();
  });
});
