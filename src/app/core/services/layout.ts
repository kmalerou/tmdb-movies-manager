import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly observer = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this.observer
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  readonly gridColumns = toSignal(
    this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map(({ breakpoints }) => {
          if (breakpoints[Breakpoints.XSmall]) return 'repeat(2, 1fr)';
          if (breakpoints[Breakpoints.Small]) return 'repeat(3, 1fr)';
          return 'repeat(4, 1fr)';
        }),
      ),
    { initialValue: 'repeat(2, 1fr)' },
  );
}
