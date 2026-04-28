import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { LayoutService } from '../../../../core/services/layout';
import { CreateCollectionFab } from '../../../../shared/components/create-collection-fab/create-collection-fab';
import { CollectionCard } from '../../components/collection-card/collection-card';
import { CollectionsActions } from '../../store/collections.actions';
import { selectCollections } from '../../store/collections.selectors';

@Component({
  selector: 'app-collections-page',
  imports: [CollectionCard, CreateCollectionFab],
  templateUrl: './collections-page.html',
  styleUrl: './collections-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsPage {
  private readonly store = inject(Store);
  readonly layout = inject(LayoutService);

  readonly collections = toSignal(this.store.select(selectCollections), { initialValue: [] });

  onDelete(collectionId: string): void {
    this.store.dispatch(CollectionsActions.deleteCollection({ collectionId }));
  }
}
