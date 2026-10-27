/* Tiny spring + clip-mask reveal toolkit (no external animation library). */

export interface Vec {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}

export interface SpringConfig {
  tension: number;
  friction: number;
}

export const EASE: { expo: string; quart: string; cubic: string } = {
  expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  quart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  cubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobileViewport = (): boolean => typeof window !== 'undefined' && window.innerWidth <= 768;

export const springs = new Set<Spring>();

type Values = Record<string, number>;

const toValues = (vec: Vec): Values => {
  const values: Values = {};
  for (const key of Object.keys(vec)) {
    const value = vec[key as keyof Vec];
    if (typeof value === 'number') {
      values[key] = value;
    }
  }
  return values;
};

export function compose(v: Values, el: HTMLElement): void {
  if (v['opacity'] !== undefined) {
    el.style.opacity = String(v['opacity']);
  }
  const x = v['x'] ?? 0;
  const y = v['y'] ?? 0;
  const s = v['scale'] ?? 1;
  const r = v['rotate'] ?? 0;
  el.style.transform = x || y || s !== 1 || r ? `translate3d(${x}px,${y}px,0) scale(${s}) rotate(${r}deg)` : 'none';
}

export class Spring {
  private readonly velocity: Values = {};
  private value: Values;
  private target: Values;
  private config: SpringConfig;

  constructor(
    readonly el: HTMLElement,
    from: Vec,
    config: SpringConfig,
  ) {
    this.value = toValues(from);
    this.target = { ...this.value };
    this.config = config;
    for (const key of Object.keys(this.value)) {
      this.velocity[key] = 0;
    }
    compose(this.value, el);
  }

  to(target: Vec, config?: SpringConfig): void {
    if (config) {
      this.config = config;
    }
    Object.assign(this.target, toValues(target));

    if (prefersReducedMotion()) {
      Object.assign(this.value, this.target);
      for (const key of Object.keys(this.velocity)) {
        this.velocity[key] = 0;
      }
      compose(this.value, this.el);
      return;
    }
    springs.add(this);
  }

  set(target: Vec): void {
    Object.assign(this.value, toValues(target));
    Object.assign(this.target, toValues(target));
    for (const key of Object.keys(this.velocity)) {
      this.velocity[key] = 0;
    }
    compose(this.value, this.el);
  }

  step(dt: number): boolean {
    if (!this.el.isConnected) {
      return false;
    }

    const { tension, friction } = this.config;
    const steps = Math.max(1, Math.ceil(dt * 240));
    const h = dt / steps;
    let moving = false;

    for (const key of Object.keys(this.target)) {
      let x = this.value[key] ?? 0;
      let v = this.velocity[key] ?? 0;
      const goal = this.target[key] ?? 0;

      for (let i = 0; i < steps; i++) {
        v += (-tension * (x - goal) - friction * v) * h;
        x += v * h;
      }

      if (Math.abs(v) < 0.002 && Math.abs(x - goal) < 0.002) {
        x = goal;
        v = 0;
      } else {
        moving = true;
      }

      this.value[key] = x;
      this.velocity[key] = v;
    }

    compose(this.value, this.el);
    return moving;
  }
}

export const spring = (el: HTMLElement, from: Vec, config: SpringConfig): Spring => new Spring(el, from, config);

/** One-shot in-view trigger (plays once). */
export function onVisible(
  el: HTMLElement,
  callback: () => void,
  margin = '0px 0px -8% 0px',
  threshold = 0.12,
): void {
  if (typeof IntersectionObserver === 'undefined') {
    callback();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        callback();
      }
    },
    { rootMargin: margin, threshold },
  );
  observer.observe(el);
}

export function inviewSpring(
  el: HTMLElement,
  from: Vec,
  to: Vec,
  config: SpringConfig,
  delay = 0,
): Spring {
  const controller = spring(el, from, config);
  onVisible(el, () => {
    window.setTimeout(() => controller.to(to), delay);
  });
  return controller;
}

export function hoverSpring(
  trigger: HTMLElement,
  target: HTMLElement,
  from: Vec,
  to: Vec,
  config: SpringConfig,
): Spring {
  const controller = spring(target, from, config);
  const enter = (): void => {
    if (!isMobileViewport()) {
      controller.to(to);
    }
  };
  const leave = (): void => {
    controller.to(from);
  };

  trigger.addEventListener('pointerenter', enter);
  trigger.addEventListener('pointerleave', leave);
  trigger.addEventListener('focus', enter);
  trigger.addEventListener('blur', leave);

  return controller;
}

export function hideInner(el: HTMLElement, out = 115, unit = '%'): void {
  el.style.transform = `translateY(${out}${unit})`;
  el.style.opacity = '0';
}

export function slideUp(
  el: HTMLElement,
  {
    delay = 0,
    duration = 950,
    ease = EASE.expo,
    out = 115,
    unit = '%',
  }: { delay?: number; duration?: number; ease?: string; out?: number; unit?: string } = {},
): void {
  el.getAnimations().forEach((animation) => animation.cancel());
  el.animate(
    [
      { transform: `translateY(${out}${unit})`, opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ],
    {
      duration: prefersReducedMotion() ? 1 : duration,
      delay: prefersReducedMotion() ? 0 : delay,
      easing: ease,
      fill: 'both',
    },
  );
}

export interface TextReveal {
  play: () => void;
}

export function stackedLines(
  el: HTMLElement,
  lines: readonly string[],
  {
    stagger = 120,
    baseDelay = 0,
    duration = 950,
    playOnView = true,
  }: { stagger?: number; baseDelay?: number; duration?: number; playOnView?: boolean } = {},
): TextReveal {
  el.setAttribute('aria-label', lines.join(' '));
  el.textContent = '';

  const inners = lines.map((line) => {
    const clip = document.createElement('span');
    clip.className = 'clip-line';
    clip.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'clip-in';
    inner.textContent = line;
    hideInner(inner);
    clip.append(inner);
    el.append(clip);
    return inner;
  });

  const play = (): void => {
    inners.forEach((inner, index) => slideUp(inner, { delay: baseDelay + index * stagger, duration }));
  };

  if (playOnView) {
    onVisible(el, play, '0px 0px -5% 0px', 0.1);
  }

  return { play };
}

export function clipWords(
  el: HTMLElement,
  text: string,
  { stagger = 140, duration = 1100, playOnView = true } = {},
): TextReveal {
  el.setAttribute('aria-label', text);
  el.textContent = '';

  const words = text.split(' ');
  const inners = words.map((word, index) => {
    const clip = document.createElement('span');
    clip.className = 'clip-word';
    clip.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'clip-in';
    inner.textContent = word;
    hideInner(inner);
    clip.append(inner);
    el.append(clip);
    if (index < words.length - 1) {
      el.append(' ');
    }
    return inner;
  });

  const play = (): void => {
    inners.forEach((inner, index) => slideUp(inner, { delay: index * stagger, duration }));
  };

  if (playOnView) {
    onVisible(el, play);
  }

  return { play };
}

export function fadeWords(
  el: HTMLElement,
  text: string,
  { stagger = 28, delay = 250, duration = 700 } = {},
): TextReveal {
  el.setAttribute('aria-label', text);
  el.textContent = '';

  const words = text.split(' ');
  const spans = words.map((word, index) => {
    const span = document.createElement('span');
    span.className = 'fw';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = word;
    hideInner(span, 18, 'px');
    el.append(span);
    if (index < words.length - 1) {
      el.append(' ');
    }
    return span;
  });

  const play = (): void => {
    spans.forEach((span, index) =>
      slideUp(span, { delay: delay + index * stagger, duration, ease: EASE.quart, out: 18, unit: 'px' }),
    );
  };

  onVisible(el, play);
  return { play };
}
