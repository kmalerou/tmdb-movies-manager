import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly observer = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this.observer.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  private readonly smallBreakpoints$ = this.observer
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(shareReplay(1));

  readonly gridColumns = toSignal(
    this.smallBreakpoints$.pipe(
      map(({ breakpoints }) => {
        if (breakpoints[Breakpoints.XSmall]) return 'repeat(2, 1fr)';
        if (breakpoints[Breakpoints.Small]) return 'repeat(3, 1fr)';
        return 'repeat(4, 1fr)';
      }),
    ),
    { initialValue: 'repeat(4, 1fr)' },
  );

  readonly collectionGridColumns = toSignal(
    this.smallBreakpoints$.pipe(
      map(({ breakpoints }) => {
        if (breakpoints[Breakpoints.XSmall]) return 'repeat(1, 1fr)';
        if (breakpoints[Breakpoints.Small]) return 'repeat(2, 1fr)';
        return 'repeat(3, 1fr)';
      }),
    ),
    { initialValue: 'repeat(3, 1fr)' },
  );
}
