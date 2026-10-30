import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../core/loader.service';
import {
  EASE,
  clipWords,
  hideInner,
  onVisible,
  slideUp,
  spring,
  stackedLines,
  type Spring,
  type TextReveal,
} from '../../core/motion';
import { ScrollMotionService } from '../../core/scroll-motion.service';
import { STATS } from '../../core/site-data';
import { CarouselDots } from '../../shared/carousel-dots/carousel-dots';
import { Icon } from '../../shared/icon/icon';
import { StatBand } from '../../shared/stat-band/stat-band';

interface HeroSlide {
  image: string;
  alt: string;
  brand: string;
  title: string;
  cta: string;
  path: string;
}

interface Capability {
  name: string;
  role: string;
  image: string;
  alt: string;
  words: readonly [string, string, string, string];
}

interface WorkRow {
  index: string;
  name: string;
  description: string;
  path: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, CarouselDots, StatBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly loader = inject(LoaderService);
  private readonly motion = inject(ScrollMotionService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly stats = STATS;

  protected readonly slides: readonly HeroSlide[] = [
    {
      image: 'assets/direct-democracy-screenshot.webp',
      alt: 'Direct Democracy dashboard with municipal issue statistics',
      brand: 'CivicTech',
      title: 'Direct Democracy',
      cta: 'Open case study',
      path: '/projects/direct-democracy',
    },
    {
      image: 'assets/nomosai-screenshot.webp',
      alt: 'NomosAI legal assistant interface with cited sources',
      brand: 'LegalTech',
      title: 'NomosAI',
      cta: 'Open case study',
      path: '/projects/nomosai',
    },
    {
      image: 'assets/dev-01.svg',
      alt: 'Abstract illustration of a code editor',
      brand: 'SaaS',
      title: 'MySiteNow',
      cta: 'Open case study',
      path: '/projects/mysitenow',
    },
  ];

  protected readonly capabilities: readonly Capability[] = [
    {
      name: 'Frontend',
      role: 'Angular · TypeScript · UI/UX',
      image: 'assets/dev-01.svg',
      alt: 'Abstract illustration of a code editor window',
      words: ['Angular', 'Driven', 'Clean', 'Code'],
    },
    {
      name: 'Full stack',
      role: 'PHP · Node.js · Express · Prisma',
      image: 'assets/dev-05.svg',
      alt: 'Abstract illustration of connected system layers',
      words: ['Full', 'Stack', 'Built', 'Right'],
    },
    {
      name: 'Business contexts',
      role: 'E-commerce · SaaS · HealthTech',
      image: 'assets/dev-09.svg',
      alt: 'Abstract illustration of a product dashboard',
      words: ['Retail', 'To', 'Health', 'Tech'],
    },
  ];

  protected readonly work: readonly WorkRow[] = [
    {
      index: '01',
      name: 'Direct Democracy',
      description: 'Municipal issue tracking with geospatial search, dashboards and an offline-first PWA.',
      path: '/projects/direct-democracy',
      image: 'assets/direct-democracy-screenshot.webp',
    },
    {
      index: '02',
      name: 'NomosAI',
      description: 'Greek legal assistant with citation-grounded RAG over your own document corpus.',
      path: '/projects/nomosai',
      image: 'assets/nomosai-screenshot.webp',
    },
    {
      index: '03',
      name: 'PolykatoikiaOS',
      description: 'Multi-role property management SaaS: billing, maintenance, voting and RBAC.',
      path: '/projects/polykatoikiaos',
      image: 'assets/dev-02.svg',
    },
    {
      index: '04',
      name: 'Metabio HealthTech',
      description: 'eConsent, specimen traceability and clinical-data workflows for biobanking.',
      path: '/projects/metabio-healthtech',
      image: 'assets/dev-03.svg',
    },
    {
      index: '05',
      name: 'MySiteNow',
      description: 'Angular SaaS website builder and its public-facing site integration.',
      path: '/projects/mysitenow',
      image: 'assets/dev-07.svg',
    },
    {
      index: '06',
      name: 'Custom E-commerce',
      description: 'PHP and Angular storefronts with Stripe and PayPal order workflows.',
      path: '/projects/custom-ecommerce',
      image: 'assets/dev-09.svg',
    },
  ];

  protected readonly journeys = [
    {
      index: '01',
      body: 'Led the Angular redesign across e-MetaBio, e-MetaBank and e-MetaRes and owned 15 end-to-end features: eConsent, specimen traceability and lab integrations.',
      company: 'Metabio',
      meta: 'Full Stack Software Engineer · 11/2024 – present',
    },
    {
      index: '02',
      body: 'Built custom PHP and Angular storefronts with Stripe and PayPal checkout, and contributed to the Logistis shipping and logistics SaaS.',
      company: 'Cactus Web',
      meta: 'Full Stack Developer · 02/2023 – 10/2023',
    },
    {
      index: '03',
      body: 'Shipped the MySiteNow website builder, ERP modules and pixel-accurate Angular interfaces from Figma, plus Node.js and Express APIs.',
      company: 'Softexpert',
      meta: 'Full Stack Developer · 07/2021 – 01/2023',
    },
  ];

  protected readonly slideIndex = signal(0);
  protected readonly capIndex = signal(0);
  protected readonly currentCap = signal(this.capabilities[0]);

  private readonly heroTitle = viewChild.required<ElementRef<HTMLElement>>('heroTitle');
  private readonly tagline = viewChild.required<ElementRef<HTMLElement>>('tagline');
  private readonly sliderWrap = viewChild.required<ElementRef<HTMLElement>>('sliderWrap');
  private readonly statusCard = viewChild.required<ElementRef<HTMLElement>>('statusCard');
  private readonly ghostWords = viewChildren<ElementRef<HTMLElement>>('ghostWord');
  private readonly ghostHeading = viewChild.required<ElementRef<HTMLElement>>('ghostHeading');
  private readonly portraitImage = viewChild.required<ElementRef<HTMLImageElement>>('portraitImage');

  private titleEngine?: TextReveal;
  private taglineEngine?: TextReveal;
  private sliderSpring?: Spring;
  private cardSpring?: Spring;
  private timers: number[] = [];
  private autoplay?: number;
  private heroPlayed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      if (this.autoplay) {
        clearInterval(this.autoplay);
      }
    });

    afterNextRender(() => {
      this.titleEngine = clipWords(this.heroTitle().nativeElement, 'Build. Ship.', {
        stagger: 140,
        duration: 1100,
        playOnView: false,
      });
      this.taglineEngine = stackedLines(this.tagline().nativeElement, ['Code With,', 'Purpose'], {
        baseDelay: 350,
        stagger: 110,
        duration: 900,
        playOnView: false,
      });

      this.sliderSpring = spring(this.sliderWrap().nativeElement, { opacity: 0, y: 28 }, { tension: 200, friction: 26 });
      this.cardSpring = spring(this.statusCard().nativeElement, { opacity: 0, y: 28 }, { tension: 200, friction: 26 });

      this.renderCapabilities(false);
      onVisible(
        this.ghostHeading().nativeElement,
        () => this.renderCapabilities(true),
        '0px 0px -12% 0px',
      );
    });

    effect(() => {
      if (this.loader.ready()) {
        untracked(() => this.playHero());
      }
    });
  }

  private playHero(): void {
    if (this.heroPlayed) {
      return;
    }
    this.heroPlayed = true;

    this.titleEngine?.play();
    this.taglineEngine?.play();

    this.timers.push(
      window.setTimeout(() => this.sliderSpring?.to({ opacity: 1, y: 0 }), 650),
      window.setTimeout(() => this.cardSpring?.to({ opacity: 1, y: 0 }), 780),
      window.setTimeout(() => this.startAutoplay(), 3800),
    );
  }

  private startAutoplay(): void {
    if (this.autoplay) {
      clearInterval(this.autoplay);
    }
    this.autoplay = window.setInterval(() => this.goSlide(this.slideIndex() + 1), 3800);
  }

  protected goSlide(index: number): void {
    this.slideIndex.set((index + this.slides.length) % this.slides.length);
  }

  protected hoverSlider(paused: boolean): void {
    if (paused) {
      if (this.autoplay) {
        clearInterval(this.autoplay);
        this.autoplay = undefined;
      }
    } else if (this.heroPlayed) {
      this.startAutoplay();
    }
  }

  protected goCapability(index: number): void {
    const next = (index + this.capabilities.length) % this.capabilities.length;
    this.capIndex.set(next);
    this.renderCapabilities(true);
    requestAnimationFrame(() => {
      this.portraitImage()?.nativeElement.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 520,
        easing: EASE.expo,
      });
    });
  }

  private renderCapabilities(play: boolean): void {
    const capability = this.capabilities[this.capIndex()];
    this.currentCap.set(capability);

    this.ghostWords().forEach((word, index) => {
      const inner = word.nativeElement;
      inner.textContent = capability.words[index];
      if (play) {
        slideUp(inner, { delay: index * 90, duration: 700 });
      } else {
        hideInner(inner);
      }
    });
  }

  protected scrollToWork(): void {
    this.motion.scrollTo('#work');
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];
  }
}
