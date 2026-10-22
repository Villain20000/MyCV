import { DestroyRef, Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  host: { class: 'card-motion' },
})
export class SpotlightDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private frame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  @HostListener('pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.reducedMotion.matches) {
      return;
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const node = this.element.nativeElement;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width);
      const y = (event.clientY - rect.top) / Math.max(1, rect.height);

      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      node.style.setProperty('--spot-color', 'rgba(174, 218, 255, 0.18)');
      node.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
      node.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
    });
  }

  @HostListener('pointerleave')
  @HostListener('focusout', ['$event'])
  protected reset(event?: FocusEvent): void {
    if (event && this.element.nativeElement.contains(event.relatedTarget as Node | null)) {
      return;
    }

    cancelAnimationFrame(this.frame);
    const node = this.element.nativeElement;
    node.style.setProperty('--spot-color', 'transparent');
    node.style.setProperty('--tilt-x', '0deg');
    node.style.setProperty('--tilt-y', '0deg');
  }

  @HostListener('focusin')
  protected onFocusIn(): void {
    const node = this.element.nativeElement;
    node.style.setProperty('--spot-x', '50%');
    node.style.setProperty('--spot-y', '35%');
    node.style.setProperty('--spot-color', 'rgba(174, 218, 255, 0.11)');
    node.style.setProperty('--tilt-x', '0deg');
    node.style.setProperty('--tilt-y', '0deg');
  }
}
