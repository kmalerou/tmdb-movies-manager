import { createFeature, createReducer, on } from '@ngrx/store';

import { Collection } from '../../../shared/models/collection.model';
import { CollectionsActions } from './collections.actions';

export const COLLECTIONS_STORAGE_KEY = 'movie-collections';

export function loadCollectionsFromStorage(): Collection[] {
  try {
    const stored = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Collection[]) : [];
  } catch {
    return [];
  }
}

export interface CollectionsState {
  collections: Collection[];
}

const initialState: CollectionsState = {
  collections: loadCollectionsFromStorage(),
};

export const collectionsFeature = createFeature({
  name: 'collections',
  reducer: createReducer(
    initialState,
    on(CollectionsActions.createCollection, (state, { name }) => ({
      ...state,
      collections: [
        ...state.collections,
        { id: crypto.randomUUID(), name, movies: [] },
      ],
    })),
    on(CollectionsActions.deleteCollection, (state, { collectionId }) => ({
      ...state,
      collections: state.collections.filter((c) => c.id !== collectionId),
    })),
    on(CollectionsActions.addMovie, (state, { collectionId, movie }) => ({
      ...state,
      collections: state.collections.map((c) =>
        c.id === collectionId && !c.movies.some((m) => m.id === movie.id)
          ? { ...c, movies: [...c.movies, movie] }
          : c,
      ),
    })),
    on(CollectionsActions.removeMovie, (state, { collectionId, movieId }) => ({
      ...state,
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, movies: c.movies.filter((m) => m.id !== movieId) }
          : c,
      ),
    })),
  ),
});
