import { DestroyRef, Directive, ElementRef, HostListener, inject } from '@angular/core';

const MAX_X = 9;
const MAX_Y = 6;

@Directive({
  selector: '[appMagnetic]',
})
export class MagneticDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame = 0;
  private resetAnimation?: Animation;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      cancelAnimationFrame(this.frame);
      this.resetAnimation?.cancel();
    });
  }

  @HostListener('pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.prefersReducedMotion()) {
      return;
    }

    this.resetAnimation?.cancel();
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const node = this.element.nativeElement;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.setProperty('--magnet-x', `${this.clamp(x * 0.18, -MAX_X, MAX_X)}px`);
      node.style.setProperty('--magnet-y', `${this.clamp(y * 0.18, -MAX_Y, MAX_Y)}px`);
    });
  }

  @HostListener('pointerleave')
  @HostListener('blur')
  protected reset(): void {
    cancelAnimationFrame(this.frame);
    const node = this.element.nativeElement;
    const current = getComputedStyle(node).getPropertyValue('translate');
    node.style.setProperty('--magnet-x', '0px');
    node.style.setProperty('--magnet-y', '0px');

    if (!this.prefersReducedMotion() && current && current !== 'none') {
      this.resetAnimation = node.animate(
        [{ translate: current }, { translate: '0px 0px' }],
        { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    }
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
