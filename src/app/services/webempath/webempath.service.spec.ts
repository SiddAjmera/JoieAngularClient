import { TestBed, inject } from '@angular/core/testing';

import { WebempathService } from './webempath.service';

describe('WebempathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebempathService]
    });
  });

  it('should be created', inject([WebempathService], (service: WebempathService) => {
    expect(service).toBeTruthy();
  }));
});
