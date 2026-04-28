import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesPage } from './movies-page';
import { moviesFeature } from '../../store/movies.reducer';
import { collectionsFeature } from '../../../collections/store/collections.reducer';

describe('MoviesPage', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPage],
      providers: [
        provideRouter([]),
        provideStore(),
        provideState(moviesFeature),
        provideState(collectionsFeature),
        provideEffects(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(MoviesPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
