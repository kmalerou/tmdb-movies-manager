import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { LayoutService } from '../../../../core/services/layout';
import { CreateCollectionDialog } from '../../../../shared/components/create-collection-dialog/create-collection-dialog';
import { CollectionCard } from '../../components/collection-card/collection-card';
import { CollectionsActions } from '../../store/collections.actions';
import { selectCollections } from '../../store/collections.selectors';

@Component({
  selector: 'app-collections-page',
  imports: [CollectionCard, MatButtonModule, MatIconModule],
  templateUrl: './collections-page.html',
  styleUrl: './collections-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsPage {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  readonly layout = inject(LayoutService);

  readonly collections = toSignal(this.store.select(selectCollections), { initialValue: [] });

  openCreateDialog(): void {
    this.dialog
      .open(CreateCollectionDialog, { width: '400px' })
      .afterClosed()
      .subscribe((name: string | undefined) => {
        if (name) this.store.dispatch(CollectionsActions.createCollection({ name }));
      });
  }

  onDelete(collectionId: string): void {
    this.store.dispatch(CollectionsActions.deleteCollection({ collectionId }));
  }
}
