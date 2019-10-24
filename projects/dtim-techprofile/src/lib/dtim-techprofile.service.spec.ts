import { TestBed } from '@angular/core/testing';

import { DtimTechprofileService } from './dtim-techprofile.service';

describe('DtimTechprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DtimTechprofileService = TestBed.get(DtimTechprofileService);
    expect(service).toBeTruthy();
  });
});
