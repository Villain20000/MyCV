import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';

interface AboutCard {
  index: string;
  title: string;
  body: string;
  chips: readonly string[];
}

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly cards: readonly AboutCard[] = [
    {
      index: '01 / Frontend',
      title: 'Interfaces that feel natural.',
      body: 'Angular-based experiences with a focus on product usability, maintainable components and responsive design.',
      chips: ['Angular', 'TypeScript', 'UI/UX'],
    },
    {
      index: '02 / Full stack',
      title: 'Functionality beyond the UI.',
      body: 'Connecting frontend experiences with backend services, business logic and data-driven applications.',
      chips: ['PHP', 'Node.js', 'Express', 'Prisma'],
    },
    {
      index: '03 / Business contexts',
      title: 'From storefronts to healthcare.',
      body: 'Experience across HealthTech and biobanking platforms, SaaS website builders, ERP systems and custom e-commerce.',
      chips: ['HealthTech', 'SaaS', 'E-commerce', 'ERP'],
    },
    {
      index: '04 / Engineering approach',
      title: 'Build, test, improve.',
      body: 'Keep solutions understandable and iterate with performance, accessibility and long-term maintainability in mind.',
      chips: ['Testing', 'A11y', 'Performance'],
    },
  ];

  protected readonly skills: ReadonlyArray<{ title: string; items: readonly string[] }> = [
    { title: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'HTML & CSS', 'Responsive UI'] },
    { title: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'PHP', 'Laravel', 'REST APIs'] },
    { title: 'Data', items: ['PostgreSQL', 'MySQL', 'Prisma', 'PostGIS', 'pgvector', 'Redis'] },
    { title: 'Practice', items: ['Jest', 'Karma', 'Playwright', 'Docker', 'Git', 'Figma', 'n8n'] },
  ];

  protected readonly snapshot = [
    {
      company: 'Metabio',
      role: 'Full Stack Software Engineer · 11/2024 – present',
      line: 'HealthTech and biobanking platforms — eConsent, traceability, clinical workflows.',
    },
    {
      company: 'Cactus Web',
      role: 'Full Stack Developer · 02/2023 – 10/2023',
      line: 'PHP and Angular storefronts, Stripe & PayPal checkout, Logistis logistics SaaS.',
    },
    {
      company: 'Softexpert',
      role: 'Full Stack Developer · 07/2018 – 01/2023',
      line: 'MySiteNow website builder, ERP modules and pixel-accurate Angular interfaces.',
    },
  ];
}
