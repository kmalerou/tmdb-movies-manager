import { collectionsFeature, CollectionsState, loadCollectionsFromStorage } from './collections.reducer';
import { CollectionsActions } from './collections.actions';
import { Movie } from '../../../shared/models/movie.model';

const reducer = collectionsFeature.reducer;

const movie: Movie = { id: 1, title: 'Inception', posterPath: null, voteAverage: 8.8, genres: ['Sci-Fi'] };

const initialState: CollectionsState = { collections: [] };

describe('collections reducer', () => {
  it('createCollection adds a collection with a unique id', () => {
    const state = reducer(initialState, CollectionsActions.createCollection({ name: 'Favourites' }));
    expect(state.collections).toHaveLength(1);
    expect(state.collections[0].name).toBe('Favourites');
    expect(state.collections[0].id).toBeTruthy();
  });

  it('deleteCollection removes the correct collection', () => {
    const withOne = reducer(initialState, CollectionsActions.createCollection({ name: 'A' }));
    const id = withOne.collections[0].id;
    const state = reducer(withOne, CollectionsActions.deleteCollection({ collectionId: id }));
    expect(state.collections).toHaveLength(0);
  });

  it('addMovie appends a movie and deduplicates', () => {
    const withCol = reducer(initialState, CollectionsActions.createCollection({ name: 'A' }));
    const id = withCol.collections[0].id;
    const withMovie = reducer(withCol, CollectionsActions.addMovie({ collectionId: id, movie }));
    const duplicate = reducer(withMovie, CollectionsActions.addMovie({ collectionId: id, movie }));
    expect(duplicate.collections[0].movies).toHaveLength(1);
  });

  it('removeMovie removes only the specified movie', () => {
    const withCol = reducer(initialState, CollectionsActions.createCollection({ name: 'A' }));
    const id = withCol.collections[0].id;
    const withMovie = reducer(withCol, CollectionsActions.addMovie({ collectionId: id, movie }));
    const state = reducer(withMovie, CollectionsActions.removeMovie({ collectionId: id, movieId: movie.id }));
    expect(state.collections[0].movies).toHaveLength(0);
  });
});

describe('loadCollectionsFromStorage', () => {
  it('returns empty array when localStorage is empty', () => {
    localStorage.clear();
    expect(loadCollectionsFromStorage()).toEqual([]);
  });
});
