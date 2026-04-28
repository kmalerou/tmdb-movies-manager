import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { LayoutService } from '../../../core/services/layout';
import { Movie } from '../../models/movie.model';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-grid',
  imports: [MovieCard],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieGrid {
  readonly layout = inject(LayoutService);

  readonly movies = input.required<Movie[]>();
  readonly action = input<'add' | 'remove' | null>(null);

  readonly movieAction = output<Movie>();
}
