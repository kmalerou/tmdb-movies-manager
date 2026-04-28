import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { TmdbService } from './tmdb';

describe('TmdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  });

  it('should be created', () => {
    expect(TestBed.inject(TmdbService)).toBeTruthy();
  });
});
