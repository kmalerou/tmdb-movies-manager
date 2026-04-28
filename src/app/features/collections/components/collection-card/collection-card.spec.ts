import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CollectionCard } from './collection-card';

const collection = { id: '1', name: 'Favourites', movies: [] };

describe('CollectionCard', () => {
  it('should create with required inputs', async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionCard],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CollectionCard);
    fixture.componentRef.setInput('collection', collection);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
