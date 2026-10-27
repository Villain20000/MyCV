import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { LoaderService } from '../../core/loader.service';
import { EASE, prefersReducedMotion, spring } from '../../core/motion';
import { ScrollMotionService } from '../../core/scroll-motion.service';
import { Icon } from '../icon/icon';

const MIN_VISIBLE_MS = 1400;
const EXIT_MS = 850;

@Component({
  selector: 'app-intro-loader',
  imports: [Icon],
  template: `
    @if (!hidden()) {
      <div id="loader" #loader role="status" aria-label="Loading portfolio">
        <div class="loader-word" #word>
          <app-icon class="mark" name="mark" />
          <span>Ioannidis</span>
        </div>
        <div class="loader-track"><div class="loader-fill" #fill></div></div>
      </div>
    }
  `,
})
export class IntroLoader {
  private readonly loaderService = inject(LoaderService);
  private readonly motion = inject(ScrollMotionService);
  private readonly loader = viewChild.required<ElementRef<HTMLElement>>('loader');
  private readonly word = viewChild.required<ElementRef<HTMLElement>>('word');
  private readonly fill = viewChild.required<ElementRef<HTMLElement>>('fill');

  protected readonly hidden = signal(false);

  private timers: number[] = [];

  ngAfterViewInit(): void {
    const reduced = prefersReducedMotion();
    const minVisible = reduced ? 200 : MIN_VISIBLE_MS;
    const exit = reduced ? 0 : EXIT_MS;

    this.motion.lock('loader', true);

    spring(this.word().nativeElement, { opacity: 0, y: 16 }, { tension: 200, friction: 22 }).to({
      opacity: 1,
      y: 0,
    });

    this.fill().nativeElement.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: reduced ? 1 : minVisible - 120, delay: reduced ? 0 : 120, easing: EASE.cubic, fill: 'both' },
    );

    this.timers.push(
      window.setTimeout(() => {
        this.loaderService.markReady();
        this.motion.lock('loader', false);

        const curtain = this.loader().nativeElement;
        const animation = curtain.animate(
          [{ transform: 'translateY(0%)' }, { transform: 'translateY(-105%)' }],
          { duration: exit, easing: EASE.cubic, fill: 'forwards' },
        );

        animation.onfinish = () => {
          this.hidden.set(true);
          this.loaderService.markFinished();
        };

        this.timers.push(
          window.setTimeout(() => {
            this.hidden.set(true);
            this.loaderService.markFinished();
          }, exit + 150),
        );
      }, minVisible),
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.motion.lock('loader', false);
  }
}
