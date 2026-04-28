import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { CollectionsPage } from './pages/collections-page/collections-page';
import { CollectionDetail } from './pages/collection-detail/collection-detail';
import { persistCollectionsEffect } from './store/collections.effects';
import { collectionsFeature } from './store/collections.reducer';

export const collectionsRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(collectionsFeature),
      provideEffects({ persistCollectionsEffect }),
    ],
    children: [
      { path: '', component: CollectionsPage },
      { path: ':id', component: CollectionDetail },
    ],
  },
];
