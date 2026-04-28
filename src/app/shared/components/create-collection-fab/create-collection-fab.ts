import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { LayoutService } from '../../../core/services/layout';
import { CollectionsActions } from '../../../features/collections/store/collections.actions';
import { CreateCollectionDialog } from '../create-collection-dialog/create-collection-dialog';

@Component({
  selector: 'app-create-collection-fab',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './create-collection-fab.html',
  styleUrl: './create-collection-fab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCollectionFab {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  readonly isHandset = inject(LayoutService).isHandset;

  openDialog(): void {
    this.dialog
      .open(CreateCollectionDialog, { width: '400px' })
      .afterClosed()
      .subscribe((name: string | undefined) => {
        if (name) this.store.dispatch(CollectionsActions.createCollection({ name }));
      });
  }
}
