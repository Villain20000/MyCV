import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TechMarquee } from '../../shared/tech-marquee/tech-marquee';
import { ToastService } from '../../shared/toast/toast.service';

export interface CapabilityTile {
  readonly id: string;
  readonly label: string;
  readonly category: 'frontend' | 'backend' | 'healthtech' | 'devops';
  readonly categoryLabel: string;
  readonly image: string;
  readonly tagline: string;
  readonly chips: readonly string[];
  readonly link?: { readonly label: string; readonly url?: string; readonly route?: string };
}

export interface CategoryFilter {
  readonly id: 'all' | 'frontend' | 'backend' | 'healthtech' | 'devops';
  readonly label: string;
  readonly count: number;
}

interface Service {
  index: string;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  glyph: string;
  title: string;
  description: string;
}

interface StackPanel {
  label: string;
  title: string;
  tools: readonly string[];
}

interface Principle {
  index: string;
  title: string;
  description: string;
}

const CAPABILITY_TILES: readonly CapabilityTile[] = [
  {
    id: 'angular-ui',
    label: 'Angular UI',
    category: 'frontend',
    categoryLabel: 'Frontend Architecture',
    image: 'assets/dev-01.svg',
    tagline:
      'Component architecture with reactive Signals, standalone components, custom directives and accessible design tokens.',
    chips: ['Angular 18+', 'Signals', 'RxJS', 'TypeScript', 'Responsive UI'],
    link: { label: 'View Angular projects ↗', route: '/projects' },
  },
  {
    id: 'api-eng',
    label: 'API Engineering',
    category: 'backend',
    categoryLabel: 'Backend & Services',
    image: 'assets/dev-02.svg',
    tagline:
      'REST API design with Node.js/Express and PHP, secure JWT authentication and role-based permissions (RBAC).',
    chips: ['Node.js', 'Express', 'PHP', 'REST APIs', 'JWT / RBAC'],
    link: { label: 'Explore experience ↗', route: '/experience' },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Core Language',
    image: 'assets/dev-03.svg',
    tagline:
      'Strict type safety, domain-driven data modeling, generic contracts, and enterprise-grade maintainability.',
    chips: ['TypeScript', 'ES6+', 'Strict Mode', 'Type Systems'],
    link: { label: 'View GitHub code ↗', url: 'https://github.com/Villain20000' },
  },
  {
    id: 'data-systems',
    label: 'Data Systems',
    category: 'backend',
    categoryLabel: 'Databases & Storage',
    image: 'assets/dev-04.svg',
    tagline:
      'Relational data modeling, PostgreSQL schemas, Prisma ORM queries, PostGIS geospatial queries, and Redis caching.',
    chips: ['PostgreSQL', 'Prisma', 'MySQL', 'PostGIS', 'Redis'],
    link: {
      label: 'See Direct Democracy ↗',
      url: 'https://github.com/Villain20000/Direct-Democracy-Municipal-Feedback-Issue-Tracker',
    },
  },
  {
    id: 'cloud-delivery',
    label: 'Cloud Delivery',
    category: 'devops',
    categoryLabel: 'DevOps & Tooling',
    image: 'assets/dev-05.svg',
    tagline:
      'Docker containerization, GitHub Actions and GitLab CI/CD pipelines for automated testing, linting and deployment.',
    chips: ['Docker', 'GitHub Actions', 'GitLab CI', 'AWS HealthLake'],
    link: { label: 'Career journey ↗', route: '/experience' },
  },
  {
    id: 'clean-code',
    label: 'Clean Code',
    category: 'devops',
    categoryLabel: 'Quality & Testing',
    image: 'assets/dev-06.svg',
    tagline:
      'Automated test suites with Jest, Karma, and Playwright, maintainable code architectures, and comprehensive reviews.',
    chips: ['Jest', 'Karma', 'Playwright', 'Vitest', 'Linting'],
    link: { label: 'View projects ↗', route: '/projects' },
  },
  {
    id: 'design-systems',
    label: 'Design Systems',
    category: 'frontend',
    categoryLabel: 'UI / UX Craft',
    image: 'assets/dev-07.svg',
    tagline:
      'Figma-to-code precision, modular design tokens, WCAG accessible contrasts, and micro-interactions.',
    chips: ['Figma', 'Design Tokens', 'a11y', 'Micro-interactions'],
    link: { label: 'About my approach ↗', route: '/about' },
  },
  {
    id: 'automation',
    label: 'Automation',
    category: 'backend',
    categoryLabel: 'Workflows & Integration',
    image: 'assets/dev-08.svg',
    tagline:
      '35+ n8n workflows, serverless automation pipelines, webhook processing, and third-party data synchronization.',
    chips: ['n8n', 'Serverless', 'Webhooks', 'Python Scripts'],
    link: { label: 'Freelance work ↗', route: '/experience' },
  },
  {
    id: 'commerce',
    label: 'Commerce',
    category: 'backend',
    categoryLabel: 'E-commerce & SaaS',
    image: 'assets/dev-09.svg',
    tagline:
      'Tailored storefronts, product catalogs, shopping carts, and secure Stripe & PayPal checkout integrations.',
    chips: ['Stripe', 'PayPal', 'PHP', 'E-commerce', 'Logistis SaaS'],
    link: { label: 'Explore projects ↗', route: '/projects' },
  },
  {
    id: 'healthcare-tech',
    label: 'Healthcare Tech',
    category: 'healthtech',
    categoryLabel: 'Healthcare & Biobanking',
    image: 'assets/dev-10.svg',
    tagline:
      '15 healthcare features across e-MetaBio & e-MetaBank, biospecimen logistics, GDPR eConsent, and HL7 v2 / FHIR.',
    chips: ['HL7 v2', 'FHIR', 'ICD-11', 'eConsent', 'Biobanking'],
    link: { label: 'Explore HealthTech study ↗', route: '/healthtech' },
  },
  {
    id: 'performance',
    label: 'Performance',
    category: 'devops',
    categoryLabel: 'Web Vitals & Speed',
    image: 'assets/dev-11.svg',
    tagline:
      'Composite-only 60fps animations, code-splitting, lazy chunk routing, and sub-second Largest Contentful Paint.',
    chips: ['Core Web Vitals', 'LCP / INP', 'Lazy Chunks', 'WAAPI / CSS'],
    link: { label: 'Portfolio details ↗', route: '/about' },
  },
  {
    id: 'product-thinking',
    label: 'Product Thinking',
    category: 'healthtech',
    categoryLabel: 'Product & Usability',
    image: 'assets/dev-12.svg',
    tagline:
      'Connecting technical architecture with real clinical, civic and commercial user workflows that solve real problems.',
    chips: ['User Workflows', 'SaaS', 'ERP Systems', 'Feedback Loops'],
    link: { label: 'Start a conversation ↗', route: '/contact' },
  },
] as const;

@Component({
  selector: 'app-home',
  imports: [RouterLink, TechMarquee, SpotlightDirective, MagneticDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toast = inject(ToastService);

  @ViewChild('tileGrid') private tileGrid?: ElementRef<HTMLElement>;
  @ViewChild('luminousSection') private luminousSection?: ElementRef<HTMLElement>;
  @ViewChild('luminousInner') private luminousInner?: ElementRef<HTMLElement>;
  @ViewChild('luminousLit') private luminousLit?: ElementRef<HTMLElement>;
  @ViewChild('experienceChapter') private experienceChapter?: ElementRef<HTMLElement>;
  @ViewChild('experienceProgress') private experienceProgress?: ElementRef<HTMLElement>;
  @ViewChild('scrollBar') private scrollBar?: ElementRef<HTMLElement>;

  private scrollFrame = 0;
  private pointerInsideLuminous = false;
  private readonly spotlight = { x: 0, y: 0, r: 0 };
  private spotlightTween?: gsap.core.Tween;

  protected readonly categoryFilters: readonly CategoryFilter[] = [
    { id: 'all', label: 'All Capabilities', count: 12 },
    { id: 'frontend', label: 'Frontend', count: 3 },
    { id: 'backend', label: 'Backend & Data', count: 4 },
    { id: 'healthtech', label: 'HealthTech & SaaS', count: 2 },
    { id: 'devops', label: 'DevOps & Quality', count: 3 },
  ];

  protected selectedCategory: 'all' | 'frontend' | 'backend' | 'healthtech' | 'devops' = 'all';
  protected activeTile: CapabilityTile = CAPABILITY_TILES[0];
  protected readonly tiles: readonly CapabilityTile[] = CAPABILITY_TILES;

  protected get filteredTiles(): readonly CapabilityTile[] {
    if (this.selectedCategory === 'all') {
      return this.tiles;
    }
    return this.tiles.filter((tile) => tile.category === this.selectedCategory);
  }

  protected selectCategory(category: 'all' | 'frontend' | 'backend' | 'healthtech' | 'devops'): void {
    this.selectedCategory = category;
    const match = this.tiles.find((t) => category === 'all' || t.category === category);
    if (match) {
      this.activeTile = match;
    }
  }

  protected readonly services: readonly Service[] = [
    {
      index: '( 001 )',
      title: 'Frontend Engineering',
      description:
        'Responsive, maintainable user interfaces with Angular, TypeScript and component-driven architecture.',
    },
    {
      index: '( 002 )',
      title: 'Backend Development',
      description:
        'API development, application logic and server-side workflows using Node.js, Express and PHP.',
    },
    {
      index: '( 003 )',
      title: 'Full-Stack SaaS',
      description:
        'Integrated applications spanning interfaces, backend services, data models and complex workflows.',
    },
    {
      index: '( 004 )',
      title: 'E-commerce',
      description:
        'Custom storefronts, integrations and bespoke commerce features tailored to business requirements.',
    },
    {
      index: '( 005 )',
      title: 'HealthTech Systems',
      description:
        'Healthcare data workflows, biobanking, eConsent and role-based application functionality.',
    },
  ];

  protected readonly processSteps: readonly ProcessStep[] = [
    {
      number: '01 / DISCOVER',
      glyph: '◇',
      title: 'Understand the problem.',
      description:
        'Clarify workflows, users, constraints and success criteria before reaching for a framework.',
    },
    {
      number: '02 / ARCHITECT',
      glyph: '⌘',
      title: 'Design the system.',
      description: 'Plan the interfaces, data model, APIs and integration points around real usage.',
    },
    {
      number: '03 / BUILD',
      glyph: '</>',
      title: 'Ship with care.',
      description:
        'Implement accessible interactions, clean code, validation and maintainable components.',
    },
    {
      number: '04 / REFINE',
      glyph: '↗',
      title: 'Measure and improve.',
      description: 'Test critical paths, resolve friction and iterate on performance and usability.',
    },
  ];

  protected readonly stackPanels: readonly StackPanel[] = [
    {
      label: 'FRONTEND',
      title: 'Interfaces that feel effortless.',
      tools: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Responsive UI'],
    },
    {
      label: 'BACKEND & DATA',
      title: 'Systems that do the heavy lifting.',
      tools: ['PHP', 'Node.js', 'Express', 'Prisma', 'REST APIs', 'Database workflows'],
    },
    {
      label: 'WORKFLOW',
      title: 'From source control to delivery.',
      tools: ['Git', 'GitHub', 'Testing', 'Integration', 'Automation', 'Accessibility'],
    },
  ];

  protected readonly principles: readonly Principle[] = [
    {
      index: '01',
      title: 'Clarity over complexity',
      description: 'Readable architectures and workflows that teams can extend.',
    },
    {
      index: '02',
      title: 'Experience matters',
      description: 'Thoughtful motion and UI details that support the user.',
    },
    {
      index: '03',
      title: 'Performance by design',
      description: 'Fast, responsive experiences with deliberate dependencies.',
    },
    {
      index: '04',
      title: 'Continuous improvement',
      description: 'Iterate with testing, feedback and measurable outcomes.',
    },
  ];

  protected readonly tags: readonly string[] = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'PHP',
    'Python',
    'Prisma',
    'SaaS',
    'E-commerce',
  ];

  protected readonly marqueeItems: readonly string[] = [
    'Angular',
    'TypeScript',
    'PHP',
    'Node.js',
    'Express',
    'Prisma',
    'HealthTech',
    'E-commerce',
    'SaaS',
    'REST APIs',
  ];

  ngAfterViewInit(): void {
    const inner = this.luminousInner?.nativeElement;
    if (inner) {
      this.spotlight.x = inner.clientWidth / 2;
      this.spotlight.y = inner.clientHeight / 2;
    }
    this.updateScrollUi();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.scrollFrame);
    this.spotlightTween?.kill();
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    if (this.scrollFrame) {
      return;
    }

    this.scrollFrame = requestAnimationFrame(() => {
      this.scrollFrame = 0;
      this.updateScrollUi();
    });
  }

  @HostListener('document:pointermove', ['$event'])
  protected onPointerMove(event: PointerEvent): void {
    if (this.prefersReducedMotion()) {
      return;
    }

    this.host.nativeElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    this.host.nativeElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  }

  protected onLuminousMove(event: PointerEvent): void {
    if (event.pointerType === 'touch' || this.prefersReducedMotion()) {
      return;
    }

    const inner = this.luminousInner?.nativeElement;
    if (!inner) {
      return;
    }

    const rect = inner.getBoundingClientRect();
    this.pointerInsideLuminous = true;
    const targetX = event.clientX - rect.left;
    const targetY = event.clientY - rect.top;

    this.spotlightTween?.kill();
    this.spotlightTween = gsap.to(this.spotlight, {
      x: targetX,
      y: targetY,
      r: 220,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => this.applySpotlight(),
    });
  }

  protected onLuminousLeave(): void {
    if (this.prefersReducedMotion()) {
      return;
    }

    const inner = this.luminousInner?.nativeElement;
    this.pointerInsideLuminous = false;
    const centerX = inner ? inner.clientWidth / 2 : this.spotlight.x;
    const centerY = inner ? inner.clientHeight / 2 : this.spotlight.y;

    this.spotlightTween?.kill();
    this.spotlightTween = gsap.to(this.spotlight, {
      x: centerX,
      y: centerY,
      r: 90,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => this.applySpotlight(),
    });
  }

  protected onLuminousFocus(): void {
    if (this.prefersReducedMotion()) {
      return;
    }

    const inner = this.luminousInner?.nativeElement;
    if (!inner) {
      return;
    }

    this.pointerInsideLuminous = true;
    this.spotlightTween?.kill();
    this.spotlightTween = gsap.to(this.spotlight, {
      x: inner.clientWidth / 2,
      y: inner.clientHeight / 2,
      r: 240,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => this.applySpotlight(),
    });
  }

  protected onLuminousBlur(): void {
    this.pointerInsideLuminous = false;
    this.updateLuminousFromScroll();
  }

  protected onTileEnter(tile: CapabilityTile): void {
    this.activeTile = tile;
  }

  protected onTileClick(tile: CapabilityTile): void {
    this.activeTile = tile;
  }

  protected copyEmail(): void {
    this.toast.copyText('john89skg@gmail.com', 'Email copied to clipboard!', 'john89skg@gmail.com');
  }

  private updateScrollUi(): void {
    const scrollBar = this.scrollBar?.nativeElement;
    if (scrollBar) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, window.scrollY / Math.max(1, maxScroll));
      scrollBar.style.transform = `scaleX(${progress})`;
    }

    const chapter = this.experienceChapter?.nativeElement;
    const rail = this.experienceProgress?.nativeElement;
    if (chapter && rail && !this.prefersReducedMotion()) {
      const rect = chapter.getBoundingClientRect();
      const progress = this.clamp(
        (window.innerHeight * 0.8 - rect.top) / Math.max(1, rect.height * 0.9),
        0,
        1,
      );
      rail.style.transform = `scaleY(${progress})`;
    }

    this.updateLuminousFromScroll();
  }

  private updateLuminousFromScroll(): void {
    if (this.pointerInsideLuminous || this.prefersReducedMotion()) {
      return;
    }

    const section = this.luminousSection?.nativeElement;
    const inner = this.luminousInner?.nativeElement;
    if (!section || !inner) {
      return;
    }

    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return;
    }

    const progress = this.clamp(
      (window.innerHeight * 0.85 - rect.top) / Math.max(1, window.innerHeight * 0.8),
      0,
      1,
    );
    const maxRadius = Math.min(270, inner.clientWidth * 0.35);
    const targetR = maxRadius * progress;
    const centerX = inner.clientWidth / 2;
    const centerY = inner.clientHeight / 2;

    this.spotlight.x = centerX;
    this.spotlight.y = centerY;
    this.spotlight.r = targetR;
    this.applySpotlight();
  }

  private applySpotlight(): void {
    const lit = this.luminousLit?.nativeElement;
    if (lit) {
      lit.style.clipPath = `circle(${Math.max(0, this.spotlight.r)}px at ${this.spotlight.x}px ${this.spotlight.y}px)`;
    }
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
