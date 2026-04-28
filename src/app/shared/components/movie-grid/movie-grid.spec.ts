import { TestBed } from '@angular/core/testing';
import { MovieGrid } from './movie-grid';

describe('MovieGrid', () => {
  it('should create with required inputs', async () => {
    await TestBed.configureTestingModule({ imports: [MovieGrid] }).compileComponents();
    const fixture = TestBed.createComponent(MovieGrid);
    fixture.componentRef.setInput('movies', []);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
