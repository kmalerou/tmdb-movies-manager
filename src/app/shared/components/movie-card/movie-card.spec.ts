import { TestBed } from '@angular/core/testing';
import { MovieCard } from './movie-card';

const movie = { id: 1, title: 'Inception', posterPath: null, voteAverage: 8.8, genres: ['Sci-Fi'] };

describe('MovieCard', () => {
  it('should create with required inputs', async () => {
    await TestBed.configureTestingModule({ imports: [MovieCard] }).compileComponents();
    const fixture = TestBed.createComponent(MovieCard);
    fixture.componentRef.setInput('movie', movie);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
