import { DestroyRef, Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
})
export class SpotlightDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  @HostListener('pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') {
      return;
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const node = this.element.nativeElement;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      node.style.setProperty('--spot-color', 'rgba(174, 218, 255, 0.15)');
    });
  }

  @HostListener('pointerleave')
  @HostListener('focusout', ['$event'])
  protected reset(event?: FocusEvent): void {
    if (event && this.element.nativeElement.contains(event.relatedTarget as Node | null)) {
      return;
    }

    cancelAnimationFrame(this.frame);
    this.element.nativeElement.style.setProperty('--spot-color', 'transparent');
  }

  @HostListener('focusin')
  protected onFocusIn(): void {
    const node = this.element.nativeElement;
    node.style.setProperty('--spot-x', '50%');
    node.style.setProperty('--spot-y', '35%');
    node.style.setProperty('--spot-color', 'rgba(174, 218, 255, 0.11)');
  }
}
