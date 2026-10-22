import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="multi-footer">
      <span>© 2026 Developer Portfolio</span>
      <span>Angular · PHP · Full-stack engineering</span>
      <div class="footer-links">
        <a href="mailto:john89skg@gmail.com">Email ↗</a>
        <a
          href="https://www.linkedin.com/in/ioannis-ioannidis-a18875156/"
          target="_blank"
          rel="noopener noreferrer"
        >LinkedIn ↗</a>
        <a routerLink="/contact">Start a conversation ↗</a>
      </div>
    </footer>
  `,
})
export class SiteFooter {}
