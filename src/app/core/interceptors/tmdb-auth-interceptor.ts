import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

export const tmdbAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  if (!req.url.startsWith(environment.tmdbBaseUrl)) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${environment.tmdbBearerToken}` },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBar.open('An error occurred. Please try again.', 'Dismiss', { duration: 4000 });
      return throwError(() => error);
    }),
  );
};
