import { Injectable } from '@angular/core';

const REVEAL_SELECTOR = '.reveal:not(.is-visible), .page-fade:not(.is-visible)';
const REVEAL_DURATION = 750;
const REVEAL_EASING = 'cubic-bezier(0.23, 1, 0.32, 1)';
const REVEAL_STAGGER = 65;
const REVEAL_STAGGER_MAX = 260;

@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer?: IntersectionObserver;
  private frame?: number;
  private timers = new Set<number>();

  scan(): void {
    cancelAnimationFrame(this.frame ?? 0);
    this.clearTimers();
    this.frame = requestAnimationFrame(() => {
      this.observer?.disconnect();

      const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion || typeof IntersectionObserver === 'undefined') {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      this.observer = new IntersectionObserver(
        (entries, observer) => {
          const batch = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          batch.forEach((entry, index) => {
            const element = entry.target as HTMLElement;
            observer.unobserve(element);

            const delay = Math.min(index * REVEAL_STAGGER, REVEAL_STAGGER_MAX);
            const timer = window.setTimeout(() => {
              this.timers.delete(timer);
              this.reveal(element);
            }, delay);
            this.timers.add(timer);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      );

      elements.forEach((element) => this.observer?.observe(element));
    });
  }

  private reveal(element: HTMLElement): void {
    if (!element.isConnected) {
      return;
    }

    element.classList.add('is-visible');
    element.animate(
      [
        { opacity: 0, transform: 'translateY(26px) scale(0.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ],
      { duration: REVEAL_DURATION, easing: REVEAL_EASING },
    );
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }
}
