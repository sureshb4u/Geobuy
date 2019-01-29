import { TestBed } from '@angular/core/testing';

import { CommunictionService } from './communiction.service';

describe('CommunictionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunictionService = TestBed.get(CommunictionService);
    expect(service).toBeTruthy();
  });
});
