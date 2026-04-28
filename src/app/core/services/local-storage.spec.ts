import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  it('should be created', () => {
    expect(TestBed.inject(LocalStorageService)).toBeTruthy();
  });
});
