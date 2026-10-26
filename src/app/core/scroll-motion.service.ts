import { DestroyRef, Injectable, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const HEADING_SELECTOR = [
  'main h1',
  '.section-head h2',
  '.section-heading',
  '.experience-header h2',
  '.about h2',
  '.contact h2',
  '.cta-panel h2',
  '.end h2',
].join(', ');

const IMAGE_SELECTOR = 'main img:not(.hero-media img):not(.expanding-tile img)';

@Injectable({ providedIn: 'root' })
export class ScrollMotionService {
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private context?: gsap.Context;
  private splits: SplitText[] = [];
  private revealedHeadings = new WeakSet<HTMLElement>();
  private generation = 0;

  constructor() {
    this.reducedMotion.addEventListener('change', this.onMotionPreferenceChange);
    inject(DestroyRef).onDestroy(() => {
      this.reducedMotion.removeEventListener('change', this.onMotionPreferenceChange);
      this.reset();
    });
  }

  revealPage(): void {
    const generation = ++this.generation;
    this.reset();

    if (this.reducedMotion.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    requestAnimationFrame(() => {
      if (generation !== this.generation) {
        return;
      }

      requestAnimationFrame(() => {
        if (generation === this.generation) {
          this.setup();
        }
      });
    });
  }

  private setup(): void {
    const root = document.querySelector<HTMLElement>('app-root main');
    if (!root) {
      return;
    }

    this.context = gsap.context(() => {
      for (const heading of gsap.utils.toArray<HTMLElement>(HEADING_SELECTOR)) {
        if (heading.closest('[aria-hidden="true"]')) {
          continue;
        }

        const label = this.accessibleLabel(heading);

        this.splits.push(
          SplitText.create(heading, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (split) => {
              heading.setAttribute('aria-label', label);

              if (this.revealedHeadings.has(heading)) {
                return gsap.set(split.lines, { yPercent: 0, opacity: 1 });
              }

              return gsap.from(split.lines, {
                yPercent: 110,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.075,
                scrollTrigger: {
                  trigger: heading,
                  start: 'top 88%',
                  once: true,
                  onEnter: () => this.revealedHeadings.add(heading),
                },
              });
            },
          }),
        );
      }

      const images = gsap.utils.toArray<HTMLImageElement>(IMAGE_SELECTOR);
      if (!images.length) {
        return;
      }

      gsap.set(images, { clipPath: 'inset(0 0 100% 0)', scale: 1.04 });
      ScrollTrigger.batch(images, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
            onComplete: () => gsap.set(batch, { clearProps: 'clipPath,scale' }),
          });
        },
      });
    }, root);
  }

  private accessibleLabel(element: HTMLElement): string {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('br').forEach((br) => br.replaceWith(' '));
    return (clone.textContent ?? '').replace(/\s+/g, ' ').trim();
  }

  private reset(): void {
    this.splits.forEach((split) => split.revert());
    this.splits = [];
    this.revealedHeadings = new WeakSet<HTMLElement>();
    this.context?.revert();
    this.context = undefined;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private readonly onMotionPreferenceChange = (): void => {
    this.revealPage();
  };
}
