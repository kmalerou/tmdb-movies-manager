import { createSelector } from '@ngrx/store';

import { moviesFeature } from './movies.reducer';

export const {
  selectItems,
  selectPage,
  selectTotalPages,
  selectStatus,
} = moviesFeature;

export const selectHasMore = createSelector(
  selectPage,
  selectTotalPages,
  (page, totalPages) => page < totalPages,
);

export const selectIsLoading = createSelector(
  selectStatus,
  (status) => status === 'loading',
);
