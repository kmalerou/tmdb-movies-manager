import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { CollectionsPage } from './collections-page';
import { collectionsFeature } from '../../store/collections.reducer';

describe('CollectionsPage', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsPage],
      providers: [provideRouter([]), provideStore(), provideState(collectionsFeature)],
    }).compileComponents();
    const fixture = TestBed.createComponent(CollectionsPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
