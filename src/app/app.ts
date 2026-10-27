import { Component, HostListener, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ScrollMotionService } from './core/scroll-motion.service';
import { ContactModal } from './shared/contact-modal/contact-modal';
import { IntroLoader } from './shared/intro-loader/intro-loader';
import { SiteFooter } from './shared/site-footer/site-footer';
import { SiteHeader } from './shared/site-header/site-header';
import { Toast } from './shared/toast/toast';

interface PageMeta {
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, Toast, IntroLoader, ContactModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly motion = inject(ScrollMotionService);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.onNavigationEnd();
    });
  }

  private onNavigationEnd(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.data as PageMeta;
    const pageTitle = data.title ?? 'Ioannis Ioannidis — Full-Stack Developer';
    const description = data.description ?? '';

    this.title.setTitle(pageTitle);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    this.meta.updateTag({ property: 'og:title', content: pageTitle });

    this.motion.scan();
    window.setTimeout(() => this.motion.resetScroll(), 0);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) {
      return;
    }

    const hash = anchor.getAttribute('href');
    if (!hash || hash.length < 2) {
      return;
    }

    const element = document.querySelector<HTMLElement>(hash);
    if (!element) {
      return;
    }

    event.preventDefault();
    this.motion.scrollTo(element);
  }
}
