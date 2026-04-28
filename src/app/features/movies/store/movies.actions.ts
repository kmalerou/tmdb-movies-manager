import { createActionGroup, props } from '@ngrx/store';

import { Movie } from '../../../shared/models/movie.model';

export const MoviesActions = createActionGroup({
  source: 'Movies',
  events: {
    'Load Movies': props<{ query: string; page: number }>(),
    'Load Movies Success': props<{ movies: Movie[]; totalPages: number; page: number }>(),
    'Load Movies Failure': props<{ error: string }>(),
  },
});
