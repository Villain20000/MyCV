import { Component } from '@angular/core';
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
      micro: 'Website builder · Agency work',
      description:
        'Contributed to the Angular website builder as well as the public website and its integration with the platform.',
      image: 'assets/dev-01.svg',
      alt: 'Abstract coding and interface illustration for MySiteNow',
      chips: ['Angular', 'Website builder', 'Platform integration'],
      action: { label: 'Visit MySiteNow ↗', href: 'https://mysitenow.gr/' },
    },
    {
      title: 'Direct Democracy',
      micro: 'GitHub project · CivicTech · Actual screenshot',
      description:
        'Mayor Dashboard for a municipal issue-tracking application, with reporting, resolutions, analytics and citizen engagement workflows.',
      image: 'assets/direct-democracy-screenshot.webp',
      alt: 'Actual Direct Democracy Mayor Dashboard screenshot showing municipal issue statistics, recent activity and navigation',
      chips: ['Angular', 'Express', 'Prisma', 'Dashboard UI'],
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
      micro: 'Project showcase · LegalTech · Actual screenshot',
      description:
        'Greek-language legal assistant interface with conversational search, document navigation and structured answers with legal references, as shown in the provided screenshot.',
      image: 'assets/nomosai-screenshot.webp',
      alt: 'Actual NomosAI Greek-language legal assistant screenshot featuring conversation history, cited legal sources and response panel',
      chips: ['LegalTech', 'AI interface', 'Greek language', 'Source citations'],
      screenshot: true,
      nomos: true,
      placeholder: 'GitHub repository · Link coming soon',
    },
    {
      title: 'Metabio / HealthTech',
      micro: 'Professional experience · Healthcare',
      description:
        'HealthTech engineering across patient, eConsent, specimen and access-management workflows. Stock imagery on the dedicated page is illustrative.',
      image: 'assets/dev-03.svg',
      alt: 'Abstract coding and interface illustration for Metabio / HealthTech',
      chips: ['Angular', 'Healthcare workflows', 'Biobanking'],
      action: { label: 'Explore HealthTech ↗', route: '/healthtech' },
    },
    {
      title: 'Custom E-commerce',
      micro: 'Agency work · Commerce',
      description:
        'Developed custom e-commerce experiences using PHP and Angular, adapted to different project requirements.',
      image: 'assets/dev-04.svg',
      alt: 'Abstract coding and interface illustration for Custom E-commerce',
      chips: ['PHP', 'Angular', 'E-commerce'],
      action: { label: 'Explore experience ↗', route: '/experience' },
    },
  ];
}
