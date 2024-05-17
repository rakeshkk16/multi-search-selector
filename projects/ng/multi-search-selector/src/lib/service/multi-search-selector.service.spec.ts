import { TestBed } from '@angular/core/testing';

import { MultiSearchSelectorService } from './multi-search-selector.service';

describe('MultiSearchSelectorService', () => {
  let service: MultiSearchSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSearchSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
