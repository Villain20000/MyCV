import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STATS } from '../../core/site-data';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';
import { StatBand } from '../../shared/stat-band/stat-band';

interface Feature {
  index: string;
  title: string;
  body: string;
}

interface Step {
  step: string;
  title: string;
  body: string;
}

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-healthtech',
  imports: [RouterLink, Icon, PageHero, StatBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './healthtech.html',
  styleUrl: './healthtech.css',
})
export class Healthtech {
  protected readonly stats = STATS;

  protected readonly features: readonly Feature[] = [
    {
      index: '01 / Patient workflows',
      title: 'Patient management',
      body: 'Interfaces and application logic for navigating patient-related records and organization-specific workflows.',
    },
    {
      index: '02 / Digital consent',
      title: 'eConsent',
      body: 'Conditional fields and context-sensitive behavior informed by institutional configuration.',
    },
    {
      index: '03 / Data discovery',
      title: 'Advanced search',
      body: 'Search and filtering experiences for complex datasets, including dynamic filter controls.',
    },
    {
      index: '04 / Governed access',
      title: 'Specimen access',
      body: 'Interfaces supporting workflows for requesting and managing access to biobanking resources.',
    },
    {
      index: '05 / Data workflows',
      title: 'Data access',
      body: 'UI workflows and conditional logic for interacting with research-oriented data systems.',
    },
    {
      index: '06 / Product quality',
      title: 'Usability & reliability',
      body: 'Making intricate workflows easier to follow with clear states, feedback and consistent interaction patterns.',
    },
  ];

  protected readonly approach: readonly Step[] = [
    {
      step: '01 / Understand',
      title: 'Map the workflow',
      body: 'Understand users, dependencies and domain constraints before touching the interface.',
    },
    {
      step: '02 / Model',
      title: 'Design the logic',
      body: 'Translate conditional rules into predictable states and explicit edge cases.',
    },
    {
      step: '03 / Build',
      title: 'Implement with care',
      body: 'Create clear interfaces and robust interactions, tested against real workflows.',
    },
    {
      step: '04 / Refine',
      title: 'Validate the experience',
      body: 'Check usability, edge cases, accessibility and consistency before shipping.',
    },
  ];

  protected readonly gallery: readonly GalleryItem[] = [
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      alt: 'Medical professional working with healthcare technology',
      caption: 'Digital health / illustrative stock photo',
    },
    {
      src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80',
      alt: 'Scientific laboratory equipment and research setting',
      caption: 'Research environments / illustrative stock photo',
    },
    {
      src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80',
      alt: 'Healthcare and medical research imagery',
      caption: 'Healthcare innovation / illustrative stock photo',
    },
  ];
}
