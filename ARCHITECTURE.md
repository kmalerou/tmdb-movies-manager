# Architecture

## Design Decisions

### Feature-based folder structure

The app is split into `features/`, `shared/`, and `core/`. Each feature owns its pages, components, and store slice in one directory. Chosen for scalability — adding or removing a feature is self-contained, with no impact on unrelated parts of the codebase.

### NgRx effects for side effects and persistence

Reducers are kept pure. `localStorage` writes happen in a single `persistCollectionsEffect` that listens to all mutation actions. Chosen because all mutation actions share the same persistence behaviour — write the full collections array to storage — so a single cross-cutting effect avoids duplicating that logic in each action handler.

## Trade-off

### Denormalised Movie[] stored in each collection

Each `Collection` stores the full `Movie` objects rather than IDs referencing a shared cache. This means no extra selector or re-fetch is needed to render a collection — the data is self-contained. The cost is duplication: the same movie stored in multiple collections is repeated in state and `localStorage`.
