import { createSelector } from '@ngrx/store';

import { collectionsFeature } from './collections.reducer';

export const { selectCollections } = collectionsFeature;

export const selectCollectionById = (id: string) =>
  createSelector(selectCollections, (collections) =>
    collections.find((c) => c.id === id) ?? null,
  );
