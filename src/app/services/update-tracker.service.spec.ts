import { TestBed } from '@angular/core/testing';

import { UpdateTrackerService } from './update-tracker.service';

describe('UpdateTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateTrackerService = TestBed.get(UpdateTrackerService);
    expect(service).toBeTruthy();
  });
});
