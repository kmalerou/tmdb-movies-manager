import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';

import { LocalStorageService } from '../../../core/services/local-storage';
import { CollectionsActions } from './collections.actions';
import { COLLECTIONS_STORAGE_KEY } from './collections.reducer';
import { selectCollections } from './collections.selectors';

export const persistCollectionsEffect = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    storage = inject(LocalStorageService),
  ) =>
    actions$.pipe(
      ofType(
        CollectionsActions.createCollection,
        CollectionsActions.deleteCollection,
        CollectionsActions.addMovie,
        CollectionsActions.removeMovie,
      ),
      withLatestFrom(store.select(selectCollections)),
      tap(([, collections]) => storage.set(COLLECTIONS_STORAGE_KEY, collections)),
    ),
  { functional: true, dispatch: false },
);
