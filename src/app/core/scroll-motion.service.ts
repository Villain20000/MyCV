import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';
import Lenis from 'lenis';
import {
  clipWords,
  fadeWords,
  hoverSpring,
  inviewSpring,
  isMobileViewport,
  prefersReducedMotion,
  springs,
  stackedLines,
  type SpringConfig,
  type Vec,
} from './motion';

const FONT_BASE = 16;
const BASE_WIDTH = 1920;
const COEF = 0.6666;

interface HoverPreset {
  from: Vec;
  to: Vec;
  config: SpringConfig;
}

const HOVER_PRESETS: Record<string, HoverPreset> = {
  arrow: { from: { x: 0 }, to: { x: 5 }, config: { tension: 320, friction: 20 } },
  arrowLong: { from: { x: 0, opacity: 0.55 }, to: { x: 8, opacity: 1 }, config: { tension: 300, friction: 20 } },
  lift: { from: { y: 0 }, to: { y: -8 }, config: { tension: 300, friction: 22 } },
  img: { from: { scale: 1 }, to: { scale: 1.04 }, config: { tension: 300, friction: 22 } },
  rotate: { from: { rotate: 0 }, to: { rotate: 90 }, config: { tension: 300, friction: 18 } },
  icon: { from: { scale: 1 }, to: { scale: 1.15 }, config: { tension: 320, friction: 18 } },
  nudge: { from: { y: 0 }, to: { y: -4 }, config: { tension: 320, friction: 22 } },
};

@Injectable({ providedIn: 'root' })
export class ScrollMotionService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly browser = isPlatformBrowser(this.platformId);

  private lenis: Lenis | null = null;
  private readonly locks = new Set<string>();
  private readonly parallaxes: Array<() => void> = [];
  private scanFrame = 0;
  private last = 0;
  private started = false;

  constructor() {
    if (!this.browser) {
      return;
    }

    this.applyRem();
    this.document.defaultView?.addEventListener('resize', this.applyRem);

    try {
      this.lenis = new Lenis({ smoothWheel: true });
    } catch {
      this.lenis = null;
    }

    this.last = performance.now();
    this.started = true;
    requestAnimationFrame(this.frame);

    inject(DestroyRef).onDestroy(() => {
      this.started = false;
      this.document.defaultView?.removeEventListener('resize', this.applyRem);
      this.lenis?.destroy();
    });
  }

  /** Recompute the adaptive rem for viewports wider than the 1920px design width. */
  private readonly applyRem = (): void => {
    const reduction = ((BASE_WIDTH - window.innerWidth) / BASE_WIDTH) * 100 * COEF;
    const size = FONT_BASE - (FONT_BASE * reduction) / 100;
    const html = this.document.documentElement;

    if (size > FONT_BASE) {
      html.style.fontSize = `${size}px`;
    } else {
      html.style.removeProperty('font-size');
    }
  };

  private readonly frame = (time: number): void => {
    if (!this.started) {
      return;
    }

    this.lenis?.raf(time);
    const dt = Math.min((time - this.last) / 1000, 1 / 20);
    this.last = time;

    for (const controller of springs) {
      if (!controller.step(dt)) {
        springs.delete(controller);
      }
    }

    for (const parallax of this.parallaxes) {
      parallax();
    }

    requestAnimationFrame(this.frame);
  };

  /** Locks native + Lenis scrolling while any overlay asks for it. */
  lock(key: string, active: boolean): void {
    if (!this.browser) {
      return;
    }

    if (active) {
      this.locks.add(key);
    } else {
      this.locks.delete(key);
    }

    const locked = this.locks.size > 0;
    this.document.documentElement.classList.toggle('locked', locked);

    if (this.lenis) {
      if (locked) {
        this.lenis.stop();
      } else {
        this.lenis.start();
      }
    }
  }

  resetScroll(): void {
    if (!this.browser) {
      return;
    }
    this.lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }

  scrollTo(target: string | HTMLElement): void {
    if (!this.browser) {
      return;
    }

    const element = typeof target === 'string' ? this.document.querySelector<HTMLElement>(target) : target;
    if (!element) {
      return;
    }

    if (this.lenis) {
      this.lenis.scrollTo(element, { offset: -12 });
    } else {
      element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /** Wire every declarative motion hook found in the freshly rendered route. */
  scan(): void {
    if (!this.browser) {
      return;
    }

    cancelAnimationFrame(this.scanFrame);
    this.parallaxes.length = 0;

    this.scanFrame = requestAnimationFrame(() => {
      this.scanFrame = requestAnimationFrame(() => this.setup());
    });
  }

  private setup(): void {
    const root = this.document.querySelector<HTMLElement>('main');
    if (!root) {
      return;
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-hover]'))) {
      if (el.dataset['hoverBound'] === '1') {
        continue;
      }
      el.dataset['hoverBound'] = '1';

      const preset = HOVER_PRESETS[el.dataset['hover'] ?? ''] ?? HOVER_PRESETS['arrow'];
      const trigger =
        (el.dataset['hoverTrigger']
          ? el.closest<HTMLElement>(el.dataset['hoverTrigger'])
          : null) ??
        el.closest<HTMLElement>('a, button, figure, article') ??
        el.parentElement;

      if (trigger) {
        hoverSpring(trigger, el, preset.from, preset.to, preset.config);
      }
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'))) {
      const axis = el.dataset['parallax'] === 'x' ? 'x' : 'y';
      const scope = el.closest<HTMLElement>('[data-parallax-scope]') ?? el.parentElement;
      const from = Number(el.dataset['from'] ?? 0);
      const to = Number(el.dataset['to'] ?? 12);
      const unit = el.dataset['unit'] ?? '%';

      if (!scope) {
        continue;
      }

      this.parallaxes.push(() => {
        if (!el.isConnected) {
          return;
        }
        const rect = scope.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < -240 || rect.top > vh + 240) {
          return;
        }
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        const value = from + (to - from) * progress;
        el.style.transform =
          axis === 'x' ? `translate3d(${value}${unit},0,0)` : `translate3d(0,${value}${unit},0)`;
      });
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-inview]'))) {
      if (el.dataset['inviewBound'] === '1') {
        continue;
      }
      el.dataset['inviewBound'] = '1';

      const delay = Number(el.dataset['delay'] ?? 0);
      const from: Vec = { opacity: 0, y: Number(el.dataset['y'] ?? 28) };
      if (el.dataset['x'] !== undefined) {
        from.x = Number(el.dataset['x']);
      }
      if (el.dataset['scale'] !== undefined) {
        from.scale = Number(el.dataset['scale']);
      }

      inviewSpring(el, from, { opacity: 1, y: 0, x: 0, scale: 1 }, { tension: 190, friction: 26 }, delay);
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-lines]'))) {
      if (el.dataset['linesBound'] === '1') {
        continue;
      }
      el.dataset['linesBound'] = '1';

      stackedLines(el, (el.dataset['lines'] ?? '').split('|'), {
        stagger: Number(el.dataset['stagger'] ?? 120),
        baseDelay: Number(el.dataset['delay'] ?? 0),
        duration: Number(el.dataset['duration'] ?? 950),
      });
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-words-fade]'))) {
      if (el.dataset['wordsBound'] === '1') {
        continue;
      }
      el.dataset['wordsBound'] = '1';
      fadeWords(el, el.dataset['wordsFade'] ?? el.textContent ?? '');
    }

    for (const el of Array.from(root.querySelectorAll<HTMLElement>('[data-words]'))) {
      if (el.dataset['wordsBound'] === '1') {
        continue;
      }
      el.dataset['wordsBound'] = '1';
      clipWords(el, el.dataset['words'] ?? el.textContent ?? '', {
        stagger: Number(el.dataset['stagger'] ?? 140),
        duration: Number(el.dataset['duration'] ?? 1100),
      });
    }
  }

  isMobile(): boolean {
    return isMobileViewport();
  }
}
