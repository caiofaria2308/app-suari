import { TestBed } from '@angular/core/testing';

import { TypeMediaService } from './type-media.service';

describe('TypeMediaService', () => {
  let service: TypeMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
