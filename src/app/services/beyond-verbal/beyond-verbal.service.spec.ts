import { TestBed, inject } from '@angular/core/testing';

import { BeyondVerbalService } from './beyond-verbal.service';

describe('BeyondVerbalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeyondVerbalService]
    });
  });

  it('should be created', inject([BeyondVerbalService], (service: BeyondVerbalService) => {
    expect(service).toBeTruthy();
  }));
});
