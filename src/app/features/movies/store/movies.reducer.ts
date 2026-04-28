import { createFeature, createReducer, on } from '@ngrx/store';

import { Movie } from '../../../shared/models/movie.model';
import { MoviesActions } from './movies.actions';

export interface MoviesState {
  items: Movie[];
  page: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

const initialState: MoviesState = {
  items: [],
  page: 0,
  totalPages: 0,
  status: 'idle',
};

export const moviesFeature = createFeature({
  name: 'movies',
  reducer: createReducer(
    initialState,
    on(MoviesActions.loadMovies, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MoviesActions.loadMoviesSuccess, (state, { movies, totalPages, page }) => ({
      ...state,
      items: page === 1 ? movies : [...state.items, ...movies],
      page,
      totalPages,
      status: 'loaded' as const,
    })),
    on(MoviesActions.loadMoviesFailure, (state) => ({
      ...state,
      status: 'error' as const,
    })),
  ),
});
