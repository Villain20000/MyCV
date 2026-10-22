import { Component, DestroyRef, HostListener, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface NavLink {
  label: string;
  mobileLabel: string;
  path: string;
}

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly menuOpen = signal(false);
  protected readonly currentPath = signal(this.normalize(this.router.url));
  protected readonly links: readonly NavLink[] = [
    { label: 'Home', mobileLabel: 'Home', path: '/' },
    { label: 'Work', mobileLabel: 'Selected Work', path: '/projects' },
    { label: 'Experience', mobileLabel: 'Experience', path: '/experience' },
    { label: 'HealthTech', mobileLabel: 'HealthTech', path: '/healthtech' },
    { label: 'About', mobileLabel: 'About', path: '/about' },
    { label: 'Contact', mobileLabel: 'Contact', path: '/contact' },
  ];

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('menu-open', this.menuOpen());
    });

    this.destroyRef.onDestroy(() => {
      document.documentElement.classList.remove('menu-open');
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentPath.set(this.normalize(this.router.url));
        this.menuOpen.set(false);
      });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected isActive(path: string): boolean {
    const current = this.currentPath();
    return path === '/' ? current === '/' : current === path || current.startsWith(`${path}/`);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth > 850) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) {
      return;
    }

    const target = event.target as Element | null;
    if (target?.closest('.mobile-nav, .mobile-menu-btn')) {
      return;
    }

    this.closeMenu();
  }

  private normalize(url: string): string {
    return url.split(/[?#]/)[0] || '/';
  }
}
