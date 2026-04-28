import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MovieGrid } from '../../../../shared/components/movie-grid/movie-grid';
import { Movie } from '../../../../shared/models/movie.model';

const STUB_MOVIES: Movie[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Movie Title ${i + 1}`,
  posterPath: null,
  voteAverage: 6 + (i % 4) * 0.5,
  genres: i % 3 === 0 ? ['Action', 'Thriller'] : i % 3 === 1 ? ['Drama'] : ['Comedy', 'Romance'],
}));

@Component({
  selector: 'app-movies-page',
  imports: [MovieGrid],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesPage {
  readonly movies = signal(STUB_MOVIES);

  onAdd(movie: Movie): void {
    console.log('add to collection', movie);
  }
}
