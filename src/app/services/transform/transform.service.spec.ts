import { TestBed, inject } from '@angular/core/testing';

import { TransformService } from './transform.service';

describe('TransformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformService]
    });
  });

  it('should be created', inject([TransformService], (service: TransformService) => {
    expect(service).toBeTruthy();
  }));
});
