import { Injectable } from '@angular/core';

const REVEAL_SELECTOR = '.reveal:not(.is-visible), .page-fade:not(.is-visible)';
const REVEAL_DURATION = 700;
const REVEAL_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer?: IntersectionObserver;
  private frame?: number;

  scan(): void {
    cancelAnimationFrame(this.frame ?? 0);
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
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            const element = entry.target as HTMLElement;
            element.classList.add('is-visible');
            element.animate(
              [
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: REVEAL_DURATION, easing: REVEAL_EASING },
            );
            observer.unobserve(element);
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      );

      elements.forEach((element) => this.observer?.observe(element));
    });
  }
}
