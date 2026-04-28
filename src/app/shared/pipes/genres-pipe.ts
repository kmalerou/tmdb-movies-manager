import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'genres' })
export class GenresPipe implements PipeTransform {
  transform(genres: string[], max = 2): string {
    return genres.slice(0, max).join(' · ');
  }
}
