import { selectHasMore, selectIsLoading } from './movies.selectors';
import { MoviesState } from './movies.reducer';

const base: MoviesState = { items: [], page: 0, totalPages: 0, status: 'idle' };

describe('selectHasMore', () => {
  it('is false when page equals totalPages', () => {
    expect(selectHasMore.projector(2, 2)).toBe(false);
  });

  it('is true when page is less than totalPages', () => {
    expect(selectHasMore.projector(1, 3)).toBe(true);
  });
});

describe('selectIsLoading', () => {
  it('is true only when status is loading', () => {
    expect(selectIsLoading.projector('loading')).toBe(true);
    expect(selectIsLoading.projector('loaded')).toBe(false);
    expect(selectIsLoading.projector('idle')).toBe(false);
  });
});
