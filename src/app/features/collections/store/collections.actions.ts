import { createActionGroup, props } from '@ngrx/store';

import { Movie } from '../../../shared/models/movie.model';

export const CollectionsActions = createActionGroup({
  source: 'Collections',
  events: {
    'Create Collection': props<{ name: string }>(),
    'Delete Collection': props<{ collectionId: string }>(),
    'Add Movie': props<{ collectionId: string; movie: Movie }>(),
    'Remove Movie': props<{ collectionId: string; movieId: number }>(),
  },
});
