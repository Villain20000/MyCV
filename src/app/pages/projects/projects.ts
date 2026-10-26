import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TechMarquee } from '../../shared/tech-marquee/tech-marquee';

interface ProjectAction {
  label: string;
  href?: string;
  route?: string;
}

interface Project {
  title: string;
  micro: string;
  description: string;
  image: string;
  alt: string;
  chips: readonly string[];
  screenshot?: boolean;
  nomos?: boolean;
  imageLink?: string;
  action?: ProjectAction;
  placeholder?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [RouterLink, TechMarquee, SpotlightDirective],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly activeProject = signal<Project | null>(null);

  protected openProject(project: Project): void {
    this.activeProject.set(project);
  }

  protected closeProject(): void {
    this.activeProject.set(null);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeProject();
  }
  protected readonly marqueeItems: readonly string[] = [
    'Angular',
    'TypeScript',
    'PHP',
    'HealthTech',
    'E-commerce',
    'CivicTech',
    'Website builders',
    'Full-stack platforms',
  ];

  protected readonly projects: readonly Project[] = [
    {
      title: 'MySiteNow',
      micro: 'Website builder · Softexpert (07/2018 – 01/2023)',
      description:
        'Contributed to the Angular SaaS website builder as well as the public-facing website and integration between both.',
      image: 'assets/dev-01.svg',
      alt: 'Abstract coding and interface illustration for MySiteNow',
      chips: ['Angular', 'Website builder', 'Platform integration', 'SaaS'],
      action: { label: 'Visit MySiteNow ↗', href: 'https://mysitenow.gr/' },
    },
    {
      title: 'PolykatoikiaOS',
      micro: 'Property Management SaaS · Independent Project',
      description:
        'Multi-role apartment management SaaS with recurring billing, payment adapters, maintenance workflows, voting and RBAC.',
      image: 'assets/dev-02.svg',
      alt: 'Abstract coding and interface illustration for PolykatoikiaOS',
      chips: ['Angular 22', 'NestJS 11', 'PostgreSQL 16', 'Prisma', 'Nx', 'RBAC'],
      action: {
        label: 'View GitHub profile ↗',
        href: 'https://github.com/Villain20000',
      },
    },
    {
      title: 'Direct Democracy',
      micro: 'CivicTech · Municipal Feedback · Actual screenshot',
      description:
        'Municipal issue reporting with geospatial queries, citizen participation, Redis caching, background processing, offline-first PWA and E2E testing.',
      image: 'assets/direct-democracy-screenshot.webp',
      alt: 'Actual Direct Democracy Mayor Dashboard screenshot showing municipal issue statistics, recent activity and navigation',
      chips: ['Angular 18', 'Express 5', 'PostGIS', 'Redis', 'BullMQ', 'PWA'],
      screenshot: true,
      featured: true,
      imageLink:
        'https://github.com/Villain20000/Direct-Democracy-Municipal-Feedback-Issue-Tracker',
      action: {
        label: 'View GitHub repository ↗',
        href: 'https://github.com/Villain20000/Direct-Democracy-Municipal-Feedback-Issue-Tracker',
      },
    },
    {
      title: 'NomosAI',
      micro: 'LegalTech · Greek Legal AI Workspace · Actual screenshot',
      description:
        'Legal-document RAG with citation-grounded search, document processing, JWT authentication, subscriptions and Docker-based deployment.',
      image: 'assets/nomosai-screenshot.webp',
      alt: 'Actual NomosAI Greek-language legal assistant screenshot featuring conversation history, cited legal sources and response panel',
      chips: ['Angular 17', 'Node.js', 'PostgreSQL', 'pgvector', 'Ollama', 'RAG'],
      screenshot: true,
      nomos: true,
      placeholder: 'GitHub repository · Link coming soon',
    },
    {
      title: 'Metabio / HealthTech',
      micro: 'Healthcare & Biobanking · Metabio (11/2024 – Present)',
      description:
        'Independently owned 15 end-to-end features across e-MetaBio, e-MetaBank and e-MetaRes: patient management, GDPR-aligned eConsent, biospecimen traceability, specimen access, and Python laboratory integrations (HL7 v2, FHIR).',
      image: 'assets/dev-03.svg',
      alt: 'Abstract coding and interface illustration for Metabio / HealthTech',
      chips: ['Angular', 'Node.js', 'Healthcare workflows', 'Biobanking', 'HL7 v2 / FHIR'],
      action: { label: 'Explore HealthTech ↗', route: '/healthtech' },
    },
    {
      title: 'Custom E-commerce',
      micro: 'Commerce & Logistics · Cactus Web (02/2023 – 10/2023) & Softexpert',
      description:
        'Developed custom full-stack e-commerce applications with PHP and Angular (product catalogs, carts, checkout, order management) and integrated Stripe and PayPal payment workflows.',
      image: 'assets/dev-04.svg',
      alt: 'Abstract coding and interface illustration for Custom E-commerce',
      chips: ['PHP', 'Angular', 'E-commerce', 'Stripe & PayPal', 'Logistics SaaS'],
      action: { label: 'Explore experience ↗', route: '/experience' },
    },
  ];
}
