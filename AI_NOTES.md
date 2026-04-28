# AI Notes

## Entry 1 — Architecture Planning

### Prompt
> Read CLAUDE.md. Do not write any code. Propose a full architecture plan and break it into small incremental slices. State your assumptions. If anything is not explicitly clear, ask me first. Keep in mind that the project is time-boxed (2-3 hours), we need to focus on providing clean pragmatic solutions under realistic time constraints.

### AI Output (partial)
```
Folder Structure

src/app/
  core/
    interceptors/auth.interceptor.ts    (bearer token)
    services/tmdb.service.ts
    models/movie.model.ts, collection.model.ts
  features/
    movies/
      store/  (actions, reducer, selectors, effects)
      components/movie-grid/, movie-card/, search-bar/
      movies.routes.ts
    collections/
      store/  (actions, reducer, selectors)  + localStorage meta-reducer
      components/collection-list/, collection-card/, collection-detail/, create-collection-dialog/
      collections.routes.ts
  shared/
    components/loading-spinner/, error-state/
```

### Changes
`MovieCard` and `MovieGrid` were initially placed under `features/movies/components/`. During review it became clear both would be needed in `CollectionDetail` as well. They were moved to `shared/components/` so both features could consume them without cross-feature imports.

### Reasoning
Placing reusable UI components inside a feature folder creates an implicit dependency from one feature to another. Moving them to `shared/` makes the boundary explicit — a component in `shared/` has no feature ownership and can be used anywhere without coupling features together.

---

## Entry 2 — MovieCard Action Pattern

### Prompt
> The card actions are mutually exclusive — a card can only ever be in add or remove mode, not both. Model this as a mode/action rather than two separate boolean inputs and two separate outputs so future actions beyond add and remove are also supported.

### AI Output (partial)
```typescript
readonly showAdd = input<boolean>(false);
readonly showRemove = input<boolean>(false);
readonly add = output<Movie>();
readonly remove = output<Movie>();
```

### Changes
Replaced the two boolean inputs and two outputs with a single `action: 'add' | 'remove' | null` input and a single `movieAction` output. The icon computation was moved to a `computed()` in TypeScript instead of being handled with a verbose `@switch` in the template.

### Reasoning
`add` and `remove` are mutually exclusive states — a card either supports adding or removing, never both. Modelling them as two separate booleans/outputs makes invalid states representable. A union type makes the constraint explicit, halves the component's interface, and leaves the door open for future action types without interface changes.

---

## Entry 3 — Generic ApiService

### Prompt
> Create a generic API service which handles HttpClient and not TMDB directly.

### AI Output (partial)
```typescript
// TmdbService injecting HttpClient directly:
private readonly http = inject(HttpClient);

this.http.get<TmdbPageResponse>(`${this.base}/movie/popular`, { params: { page } })
```

### Changes
Introduced `ApiService` with a typed `get<T>(url, params?)` method that wraps `HttpClient`. `TmdbService` now injects `ApiService` instead of `HttpClient` directly.

### Reasoning
`TmdbService` should not depend on Angular's HTTP primitive directly — that creates a wide surface to mock in tests. With `ApiService` as the boundary, testing `TmdbService` only requires mocking one service, and any future cross-cutting HTTP behaviour (retries, base URL handling) has a single place to live.
