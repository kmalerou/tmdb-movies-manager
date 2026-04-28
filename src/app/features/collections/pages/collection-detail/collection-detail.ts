import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { MovieGrid } from '../../../../shared/components/movie-grid/movie-grid';
import { Movie } from '../../../../shared/models/movie.model';
import { CollectionsActions } from '../../store/collections.actions';
import { selectCollectionById } from '../../store/collections.selectors';

@Component({
  selector: 'app-collection-detail',
  imports: [MovieGrid, MatButtonModule, MatIconModule],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetail {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  readonly collection = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.store.select(selectCollectionById(id))),
    ),
    { initialValue: null },
  );

  onRemoveMovie(movie: Movie): void {
    this.store.dispatch(
      CollectionsActions.removeMovie({ collectionId: this.id(), movieId: movie.id }),
    );
  }

  goBack(): void {
    this.router.navigate(['/collections']);
  }
}
