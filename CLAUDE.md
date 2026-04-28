# Movie Collections App

Angular application for browsing TMDB movies and managing personal movie collections.

## Features

- **Movie Discovery**
  - grid of popular movies with infinite scrolling
  - search (only by title)
- **Collection Management**
  - user can create view collections
  - add movies to collection
  - remove movies from collection
  - delete collection
- **Collection Detail**
  - user can view movies in a collection
  - remove movie from collection

## Stack

- Angular 21
- NgRx
- Angular Material
- TypeScript strict mode
- Vitest
- TMDB API (v3, bearer token auth)

## Folder Structure

```
src/app/
  features/
  shared/
  core/
```

## Git

- Use conventional commit naming for all commits (feat:, fix:, refactor:, test:, docs:, chore:)
- Keep commits small and logically scoped

## UX

- Prioritize mobile-first responsive design; all interfaces must work seamlessly across phone, tablet, and desktop breakpoints
- Follow established UX best practices and common platform conventions unless there is a strong reason to diverge
- Propose UX options before implementing any UI

## Angular Conventions

@docs/angular-best-practices.md
The skill at `.claude/skills/angular-developer/` is installed and active.

## Workflow

- Avoid overengineering — this project demonstrates best practices, not complexity
- Consider reusability and scalability
- Follow single responsibility
- Favor pragmatic separation of concerns: simple code with explicit boundaries

**1. Feature plan**
Before each feature, I describe my approach. You challenge it — flag risks, assumptions I haven't stated, and decisions that will be hard to undo. Always consider the full three-feature picture when proposing solutions. Once aligned, propose an implementation plan and wait for my approval.

**2. Build**
Execute the approved plan in small vertical slices — each slice delivers a complete user-facing capability end-to-end, including tests.

## Testing

- 1 reducer test, 1 selector test, 1 component test minimum
- Target >60% coverage on core logic, not UI boilerplate
- Mock TMDB API in tests, never hit it live

## Documentation

- README.md: setup, run, test, API key instructions
- ARCHITECTURE.md: 2–3 design decisions + one trade-off reflection
- AI_NOTES.md: 3–5 entries tracking AI usage

## Out of Scope

- Advanced NgRx patterns (entity adapters, normalized state)
- End-to-end tests
- Backend persistence, multi-device sync
- Dark mode, animations, UI perfection
- Advanced filtering

## Known Decisions

> Filled as we plan and build. Don't revisit settled decisions.
