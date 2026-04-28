import { AfterViewInit, Directive, ElementRef, inject, OnDestroy, output } from '@angular/core';

@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScroll implements AfterViewInit, OnDestroy {
  private readonly el = inject<ElementRef<Element>>(ElementRef);

  readonly scrolled = output<void>();

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
