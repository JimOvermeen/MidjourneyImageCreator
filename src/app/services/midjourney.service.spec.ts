import { TestBed } from '@angular/core/testing';

import { MidjourneyService } from './midjourney.service';

describe('MidjourneyService', () => {
  let service: MidjourneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidjourneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
