import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { environment } from '../../../../environments/environment';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [DecimalPipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly action = input<'add' | 'remove' | null>(null);

  readonly add = output<Movie>();
  readonly remove = output<Movie>();

  readonly posterUrl = computed(() => {
    const path = this.movie().posterPath;
    return path ? `${environment.tmdbImageBaseUrl}/w500${path}` : null;
  });
}
