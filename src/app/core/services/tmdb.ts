import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Movie } from '../../shared/models/movie.model';

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

interface TmdbPageResponse {
  page: number;
  total_pages: number;
  results: TmdbMovie[];
}

type GenreMap = Record<number, string>;

export interface MoviesPage {
  movies: Movie[];
  totalPages: number;
}

function toMovie(raw: TmdbMovie, genreMap: GenreMap): Movie {
  return {
    id: raw.id,
    title: raw.title,
    posterPath: raw.poster_path,
    voteAverage: raw.vote_average,
    genres: raw.genre_ids.slice(0, 2).map((id) => genreMap[id]).filter(Boolean),
  };
}

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.tmdbBaseUrl;

  private readonly genreMap$: Observable<GenreMap> = this.http
    .get<{ genres: { id: number; name: string }[] }>(`${this.base}/genre/movie/list`)
    .pipe(
      map(({ genres }) => Object.fromEntries(genres.map((g) => [g.id, g.name]))),
      shareReplay(1),
    );

  getPopular(page: number): Observable<MoviesPage> {
    return forkJoin({
      page: this.http.get<TmdbPageResponse>(`${this.base}/movie/popular`, { params: { page } }),
      genreMap: this.genreMap$,
    }).pipe(
      map(({ page, genreMap }) => ({
        movies: page.results.map((r) => toMovie(r, genreMap)),
        totalPages: page.total_pages,
      })),
    );
  }

  search(query: string, page: number): Observable<MoviesPage> {
    return forkJoin({
      page: this.http.get<TmdbPageResponse>(`${this.base}/search/movie`, { params: { query, page } }),
      genreMap: this.genreMap$,
    }).pipe(
      map(({ page, genreMap }) => ({
        movies: page.results.map((r) => toMovie(r, genreMap)),
        totalPages: page.total_pages,
      })),
    );
  }
}
