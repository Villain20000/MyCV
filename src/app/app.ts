import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { RevealService } from './core/reveal.service';
import { SiteFooter } from './shared/site-footer/site-footer';
import { SiteHeader } from './shared/site-header/site-header';

interface PageMeta {
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly reveal = inject(RevealService);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.onNavigationEnd());
  }

  private onNavigationEnd(): void {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.data as PageMeta;
    const pageTitle = data.title ?? 'Developer Portfolio';
    const description = data.description ?? '';

    this.title.setTitle(pageTitle);
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    this.meta.updateTag({ property: 'og:title', content: pageTitle });

    this.reveal.scan();
  }
}
