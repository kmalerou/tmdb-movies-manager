import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TmdbService } from '../../../core/services/tmdb';
import { MoviesActions } from './movies.actions';

export const loadMoviesEffect = createEffect(
  (actions$ = inject(Actions), tmdb = inject(TmdbService)) =>
    actions$.pipe(
      ofType(MoviesActions.loadMovies),
      switchMap(({ query, page }) => {
        const request$ = query ? tmdb.search(query, page) : tmdb.getPopular(page);
        return request$.pipe(
          map(({ movies, totalPages }) =>
            MoviesActions.loadMoviesSuccess({ movies, totalPages, page }),
          ),
          catchError(() =>
            of(MoviesActions.loadMoviesFailure({ error: 'Failed to load movies' })),
          ),
        );
      }),
    ),
  { functional: true },
);
