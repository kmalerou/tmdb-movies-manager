import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { MoviesPage } from './pages/movies-page/movies-page';
import { loadMoviesEffect } from './store/movies.effects';
import { moviesFeature } from './store/movies.reducer';

export const moviesRoutes: Routes = [
  {
    path: '',
    component: MoviesPage,
    providers: [
      provideState(moviesFeature),
      provideEffects({ loadMoviesEffect }),
    ],
  },
];
