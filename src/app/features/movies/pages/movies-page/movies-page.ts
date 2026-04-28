import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import { CreateCollectionFab } from '../../../../shared/components/create-collection-fab/create-collection-fab';
import { MovieGrid } from '../../../../shared/components/movie-grid/movie-grid';
import { InfiniteScroll } from '../../../../shared/directives/infinite-scroll';
import { Movie } from '../../../../shared/models/movie.model';
import { SearchBar } from '../../components/search-bar/search-bar';
import { MoviesActions } from '../../store/movies.actions';
import { selectHasMore, selectIsLoading, selectItems, selectPage } from '../../store/movies.selectors';

@Component({
  selector: 'app-movies-page',
  imports: [MovieGrid, SearchBar, InfiniteScroll, MatProgressBarModule, CreateCollectionFab],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesPage implements OnInit {
  private readonly store = inject(Store);

  readonly movies = toSignal(this.store.select(selectItems), { initialValue: [] });
  readonly isLoading = toSignal(this.store.select(selectIsLoading), { initialValue: false });
  readonly hasMore = toSignal(this.store.select(selectHasMore), { initialValue: false });
  readonly currentPage = toSignal(this.store.select(selectPage), { initialValue: 0 });

  private readonly query = signal('');

  ngOnInit(): void {
    this.store.dispatch(MoviesActions.loadMovies({ query: '', page: 1 }));
  }

  onQueryChange(query: string): void {
    this.query.set(query);
    this.store.dispatch(MoviesActions.loadMovies({ query, page: 1 }));
  }

  onScroll(): void {
    if (this.hasMore() && !this.isLoading()) {
      this.store.dispatch(
        MoviesActions.loadMovies({ query: this.query(), page: this.currentPage() + 1 }),
      );
    }
  }

  onMovieAction(_movie: Movie): void {
    // wired in slice 6 — Add to Collection
  }
}
