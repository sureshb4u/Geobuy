import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

describe('AppComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
});
