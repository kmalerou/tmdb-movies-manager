import { Routes } from '@angular/router';

import { CollectionsPage } from './pages/collections-page/collections-page';
import { CollectionDetail } from './pages/collection-detail/collection-detail';

export const collectionsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CollectionsPage },
      { path: ':id', component: CollectionDetail },
    ],
  },
];
