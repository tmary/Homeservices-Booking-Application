import { TestBed } from '@angular/core/testing';

import { ServiceAreasService } from './service-areas.service';

describe('ServiceAreasService', () => {
  let service: ServiceAreasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAreasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
