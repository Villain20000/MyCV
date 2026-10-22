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
import { MagneticDirective } from '../../shared/magnetic.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TechMarquee } from '../../shared/tech-marquee/tech-marquee';

interface Tile {
  id: string;
  label: string;
  image: string;
  width: string;
  height: string;
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

const TILE_PATTERN = [
  { label: 'Angular UI', image: 'assets/dev-01.svg', width: '45%', height: '48%' },
  { label: 'API Engineering', image: 'assets/dev-02.svg', width: '65%', height: '80%' },
  { label: 'TypeScript', image: 'assets/dev-03.svg', width: '95%', height: '115%' },
  { label: 'Data Systems', image: 'assets/dev-04.svg', width: '83%', height: '105%' },
  { label: 'Cloud Delivery', image: 'assets/dev-05.svg', width: '62%', height: '76%' },
  { label: 'Clean Code', image: 'assets/dev-06.svg', width: '48%', height: '53%' },
  { label: 'Design Systems', image: 'assets/dev-07.svg', width: '40%', height: '43%' },
  { label: 'Automation', image: 'assets/dev-08.svg', width: '38%', height: '40%' },
  { label: 'Commerce', image: 'assets/dev-09.svg', width: '45%', height: '50%' },
  { label: 'Healthcare Tech', image: 'assets/dev-10.svg', width: '37%', height: '42%' },
  { label: 'Performance', image: 'assets/dev-11.svg', width: '43%', height: '48%' },
  { label: 'Product Thinking', image: 'assets/dev-12.svg', width: '46%', height: '54%' },
] as const;

@Component({
  selector: 'app-home',
  imports: [RouterLink, TechMarquee, SpotlightDirective, MagneticDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  @ViewChild('tileGrid') private tileGrid?: ElementRef<HTMLElement>;
  @ViewChild('luminousSection') private luminousSection?: ElementRef<HTMLElement>;
  @ViewChild('luminousInner') private luminousInner?: ElementRef<HTMLElement>;
  @ViewChild('luminousLit') private luminousLit?: ElementRef<HTMLElement>;
  @ViewChild('experienceChapter') private experienceChapter?: ElementRef<HTMLElement>;
  @ViewChild('experienceProgress') private experienceProgress?: ElementRef<HTMLElement>;
  @ViewChild('scrollBar') private scrollBar?: ElementRef<HTMLElement>;

  private scrollFrame = 0;
  private pointerInsideLuminous = false;

  protected readonly tiles: readonly Tile[] = Array.from({ length: 4 }, (_, cycle) =>
    TILE_PATTERN.map((tile, index) => ({
      ...tile,
      id: `${cycle}-${index}`,
    })),
  ).flat();

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
    this.updateScrollUi();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.scrollFrame);
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
    this.setSpotlight(event.clientX - rect.left, event.clientY - rect.top, 210);
  }

  protected onLuminousLeave(): void {
    if (this.prefersReducedMotion()) {
      return;
    }

    const inner = this.luminousInner?.nativeElement;
    this.pointerInsideLuminous = false;
    this.setSpotlight(inner ? inner.clientWidth / 2 : 0, inner ? inner.clientHeight / 2 : 0, 90);
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
    this.setSpotlight(inner.clientWidth / 2, inner.clientHeight / 2, 240);
  }

  protected onLuminousBlur(): void {
    this.pointerInsideLuminous = false;
    this.updateLuminousFromScroll();
  }

  protected onTileEnter(event: Event, tile: HTMLElement): void {
    if ((event as PointerEvent).pointerType === 'touch' || this.prefersReducedMotion()) {
      return;
    }

    const grid = this.tileGrid?.nativeElement;
    if (!grid) {
      return;
    }

    const tiles = Array.from(grid.querySelectorAll<HTMLElement>('.expanding-tile'));
    const activeRect = tile.getBoundingClientRect();
    const activeX = activeRect.left + activeRect.width / 2;
    const activeY = activeRect.top + activeRect.height / 2;

    for (const other of tiles) {
      if (other === tile) {
        other.style.transform = 'scale(1.65)';
        continue;
      }

      const rect = other.getBoundingClientRect();
      const distance = Math.hypot(
        activeX - (rect.left + rect.width / 2),
        activeY - (rect.top + rect.height / 2),
      );
      const factor = Math.max(0, 1 - distance / 270);
      other.style.transform = factor > 0 ? `scale(${1 + factor * 0.25})` : '';
    }
  }

  protected onTileLeave(): void {
    const grid = this.tileGrid?.nativeElement;
    if (!grid) {
      return;
    }

    grid
      .querySelectorAll<HTMLElement>('.expanding-tile')
      .forEach((tile) => (tile.style.transform = ''));
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
    this.setSpotlight(inner.clientWidth / 2, inner.clientHeight / 2, maxRadius * progress);
  }

  private setSpotlight(x: number, y: number, radius: number): void {
    const lit = this.luminousLit?.nativeElement;
    if (lit) {
      lit.style.clipPath = `circle(${Math.max(0, radius)}px at ${x}px ${y}px)`;
    }
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
