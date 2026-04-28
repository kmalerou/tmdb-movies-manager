import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { Collection } from '../../models/collection.model';
import { Movie } from '../../models/movie.model';
import { CollectionsActions } from '../../../features/collections/store/collections.actions';
import { selectCollections } from '../../../features/collections/store/collections.selectors';

export interface AddToCollectionData {
  movie: Movie;
}

@Component({
  selector: 'app-add-to-collection-panel',
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatListModule],
  templateUrl: './add-to-collection-panel.html',
  styleUrl: './add-to-collection-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCollectionPanel {
  private readonly store = inject(Store);
  private readonly bottomSheetRef = inject<MatBottomSheetRef>(MatBottomSheetRef, { optional: true });
  private readonly dialogRef = inject<MatDialogRef<AddToCollectionPanel>>(MatDialogRef, { optional: true });

  readonly movie: Movie = (
    inject<AddToCollectionData>(MAT_BOTTOM_SHEET_DATA, { optional: true }) ??
    inject<AddToCollectionData>(MAT_DIALOG_DATA, { optional: true })
  )!.movie;

  readonly collections = toSignal(this.store.select(selectCollections), { initialValue: [] });

  isInCollection(collection: Collection): boolean {
    return collection.movies.some((m) => m.id === this.movie.id);
  }

  addToCollection(collectionId: string): void {
    this.store.dispatch(CollectionsActions.addMovie({ collectionId, movie: this.movie }));
  }

  close(): void {
    this.bottomSheetRef?.dismiss();
    this.dialogRef?.close();
  }
}
