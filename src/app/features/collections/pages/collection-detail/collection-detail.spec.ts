import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { CollectionDetail } from './collection-detail';
import { collectionsFeature } from '../../store/collections.reducer';

describe('CollectionDetail', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDetail],
      providers: [provideRouter([]), provideStore(), provideState(collectionsFeature)],
    }).compileComponents();
    const fixture = TestBed.createComponent(CollectionDetail);
    fixture.componentRef.setInput('id', 'test-id');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
