import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { tmdbAuthInterceptor } from './core/interceptors/tmdb-auth-interceptor';
import { collectionsFeature } from './features/collections/store/collections.reducer';
import { persistCollectionsEffect } from './features/collections/store/collections.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tmdbAuthInterceptor])),
    provideStore(),
    provideEffects({ persistCollectionsEffect }),
    provideStoreDevtools({ maxAge: 25 }),
    provideState(collectionsFeature),
  ],
};
