import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'mycv-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.mode());
  }

  toggle(): void {
    const nextTheme: ThemeMode = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(nextTheme);
    this.applyTheme(nextTheme);
  }

  private getInitialTheme(): ThemeMode {
    const view = this.document.defaultView;

    try {
      const savedTheme = view?.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Storage may be unavailable in private or restricted browsing contexts.
    }

    return view?.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  private applyTheme(theme: ThemeMode): void {
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.documentElement.style.background = theme === 'light' ? '#ffffff' : '#070a10';
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#ffffff' : '#070a10');

    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The current choice still applies for this session when storage is unavailable.
    }
  }
}
