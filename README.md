# TMDB Movies Manager

An Angular 21 app for browsing popular movies from the TMDB API and organising them into personal collections. Built with NgRx, Angular Material, and Vitest.

## Requirements

- Node.js `v24.15.0`
- npm `11.12.1`

## API Key Setup

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to **Settings → API** and generate a **Bearer Token (Read Access Token)**
3. Open `src/environments/environment.development.ts` and set:

```ts
export const environment = {
  tmdbBearerToken: 'YOUR_BEARER_TOKEN_HERE',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p',
};
```

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```
