import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ModalService } from '../../core/modal.service';
import { EASE, hoverSpring, prefersReducedMotion, spring, type Spring } from '../../core/motion';
import { ScrollMotionService } from '../../core/scroll-motion.service';
import { NAV_LINKS, SOCIALS } from '../../core/site-data';
import { ThemeService } from '../../core/theme.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly motion = inject(ScrollMotionService);

  protected readonly modal = inject(ModalService);
  protected readonly theme = inject(ThemeService);

  protected readonly links = NAV_LINKS;
  protected readonly socials = SOCIALS;
  protected readonly menuOpen = signal(false);
  protected readonly currentPath = signal(this.normalize(this.router.url));
  protected readonly stuck = signal(false);

  private menuBg?: Spring;
  private menuPanel?: Spring;
  private menuLinks: Spring[] = [];
  private timers: number[] = [];
  private menuRoot?: HTMLElement;
  private closeButton?: HTMLElement;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.motion.lock('menu', false);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentPath.set(this.normalize(this.router.url));
        if (this.menuOpen()) {
          this.closeMenu();
        }
        this.stuck.set(false);
      });

    effect(() => {
      if (this.menuOpen()) {
        document.documentElement.classList.add('menu-open');
      } else {
        document.documentElement.classList.remove('menu-open');
      }
    });
  }

  ngAfterViewInit(): void {
    const root = document.getElementById('siteMenu');
    if (!root) {
      return;
    }

    this.menuRoot = root;
    this.closeButton = root.querySelector<HTMLElement>('[data-menu-close]') ?? undefined;

    this.menuBg = spring(root.querySelector<HTMLElement>('.menu__bg')!, { opacity: 0 }, { tension: 260, friction: 30 });
    this.menuPanel = spring(
      root.querySelector<HTMLElement>('.menu__panel')!,
      { opacity: 0, y: -24 },
      { tension: 220, friction: 28 },
    );
    this.menuLinks = Array.from(root.querySelectorAll<HTMLElement>('.menu__link')).map((link) =>
      spring(link, { opacity: 0, y: 28 }, { tension: 200, friction: 26 }),
    );

    hoverSpring(this.closeButton ?? root, this.closeButton?.querySelector('app-icon') ?? root, { rotate: 0 }, { rotate: 90 }, {
      tension: 300,
      friction: 18,
    });
    hoverSpring(root, root.querySelector<HTMLElement>('.brand .mark') ?? root, { scale: 1 }, { scale: 1.08 }, {
      tension: 300,
      friction: 20,
    });

    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private readonly onScroll = (): void => {
    this.stuck.set(window.scrollY > 24);
  };

  protected toggleMenu(): void {
    this.menuOpen() ? this.closeMenu() : this.openMenu();
  }

  protected openMenu(): void {
    if (this.menuOpen()) {
      return;
    }
    this.menuOpen.set(true);
    this.motion.lock('menu', true);
    this.menuRoot?.classList.add('is-open');
    this.menuRoot?.removeAttribute('aria-hidden');
    this.menuRoot?.removeAttribute('inert');

    this.menuBg?.to({ opacity: 1 });
    this.menuPanel?.to({ opacity: 1, y: 0 });

    this.clearTimers();
    this.menuLinks.forEach((controller, index) => {
      const timer = window.setTimeout(() => controller.to({ opacity: 1, y: 0 }), 120 + index * 70);
      this.timers.push(timer);
    });
    this.timers.push(window.setTimeout(() => this.closeButton?.focus(), 80));
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.motion.lock('menu', false);
    this.clearTimers();

    this.menuBg?.to({ opacity: 0 });
    this.menuPanel?.to({ opacity: 0, y: -24 });
    this.menuLinks.forEach((controller) => controller.to({ opacity: 0, y: 28 }));

    this.menuRoot?.setAttribute('inert', '');
    this.menuRoot?.setAttribute('aria-hidden', 'true');
    this.timers.push(
      window.setTimeout(() => {
        if (!this.menuOpen()) {
          this.menuRoot?.classList.remove('is-open');
        }
      }, 420),
    );
  }

  protected openModal(): void {
    this.closeMenu();
    this.timers.push(window.setTimeout(() => this.modal.open(), 120));
  }

  protected toggleTheme(): void {
    this.theme.toggle();
    const icon = document.querySelector<HTMLElement>('.theme-toggle app-icon');
    if (icon) {
      icon.animate(
        [
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(180deg) scale(0.85)' },
          { transform: 'rotate(360deg) scale(1)' },
        ],
        { duration: prefersReducedMotion() ? 1 : 520, easing: EASE.expo },
      );
    }
  }

  protected isActive(path: string): boolean {
    const current = this.currentPath();
    return path === '/' ? current === '/' : current === path || current.startsWith(`${path}/`);
  }

  protected onMenuLink(): void {
    this.closeMenu();
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];
  }

  private normalize(url: string): string {
    return url.split(/[?#]/)[0] || '/';
  }
}
