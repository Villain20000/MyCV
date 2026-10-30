import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { STATS } from '../../core/site-data';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';
import { StatBand } from '../../shared/stat-band/stat-band';

interface Role {
  index: string;
  discipline: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  bullets: readonly string[];
  chips: readonly string[];
}

@Component({
  selector: 'app-experience',
  imports: [RouterLink, Icon, PageHero, StatBand],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  protected readonly stats = STATS;

  protected readonly roles: readonly Role[] = [
    {
      index: '01',
      discipline: 'Health technology',
      company: 'Metabio',
      role: 'Full Stack Software Engineer',
      dates: '11/2024 – present',
      location: 'Thessaloniki, Greece',
      summary: 'Healthcare and biobanking applications across e-MetaBio, e-MetaBank and e-MetaRes.',
      bullets: [
        'Led a redesign of Angular frontends for healthcare and biobanking applications, modernizing clinical and operational workflows.',
        'Independently owned 15 end-to-end features across three products, spanning Angular UI, Node.js services, REST API integration and business logic.',
        'Built patient-management and controlled-data workflows: advanced search, conditional filters, multiselect inputs, specimen access and data access.',
        'Developed biospecimen logistics and traceability: specimen information exchange, shipments and receipt confirmation.',
        'Delivered GDPR-aligned eConsent and revocation functionality, JWT authentication and role-based access control.',
        'Built Python integration scripts for 70 laboratory analysis types using HL7 v2, FHIR, ICD-11 and AWS HealthLake, with Jest, Karma and Playwright coverage.',
      ],
      chips: ['Angular', 'Node.js', 'TypeScript', 'REST APIs', 'eConsent', 'Biobanking', 'HL7 v2 / FHIR', 'Python'],
    },
    {
      index: '02',
      discipline: 'Full stack & automation',
      company: 'Independent / Freelance',
      role: 'Full Stack Developer',
      dates: '11/2023 – 10/2024',
      location: 'Remote',
      summary: 'Custom full-stack web applications and serverless automation workflows.',
      bullets: [
        'Delivered custom web applications using Angular, Node.js, Vue.js, Laravel, REST APIs and PostgreSQL/MySQL.',
        'Developed 35+ n8n and serverless automation workflows for synchronization, integrations and alerts.',
      ],
      chips: ['Angular', 'Node.js', 'Vue.js', 'Laravel', 'PostgreSQL', 'MySQL', 'n8n', 'Automation'],
    },
    {
      index: '03',
      discipline: 'E-commerce & logistics',
      company: 'Cactus Web',
      role: 'Full Stack Developer',
      dates: '02/2023 – 10/2023',
      location: 'Thessaloniki, Greece',
      summary: 'Custom e-commerce applications and logistics SaaS for commercial clients.',
      bullets: [
        'Developed custom e-commerce applications with PHP and Angular, including product catalogs, carts, checkout and order management.',
        'Contributed to a custom marketplace and the Logistis shipping/logistics SaaS; integrated Stripe and PayPal payment workflows.',
      ],
      chips: ['PHP', 'Angular', 'E-commerce', 'Stripe & PayPal', 'Logistics SaaS'],
    },
    {
      index: '04',
      discipline: 'SaaS & ERP',
      company: 'Softexpert',
      role: 'Full Stack Developer (Angular / Node.js)',
      dates: '07/2021 – 01/2023',
      location: 'Greece',
      summary: 'MySiteNow, an Angular SaaS website builder, plus custom e-commerce and ERP solutions.',
      bullets: [
        'Built custom full-stack Angular e-commerce applications with Node.js/Express REST APIs and client-specific storefront features.',
        'Contributed to MySiteNow: website-editor functionality and integration with its public-facing website.',
        'Implemented ERP functionality for invoicing, inventory and customer management, connecting Angular interfaces with backend APIs.',
        'Delivered responsive, pixel-accurate Angular interfaces from Figma designs and shipped requested features through Trello-managed tasks.',
        'Contributed to a point-to-point limousine transfer booking application; wrote Python scripts to automate e-commerce imports.',
      ],
      chips: ['Angular', 'Node.js', 'Express', 'PHP', 'SaaS', 'ERP', 'REST APIs', 'Figma'],
    },
    {
      index: '05',
      discipline: 'E-commerce operations',
      company: 'Vmondo Bachatouris',
      role: 'E-commerce Management',
      dates: '03/2015 – 06/2018',
      location: 'Greece',
      summary: 'Online store administration and e-commerce operations.',
      bullets: ['Managed day-to-day e-commerce operations and online store administration.'],
      chips: ['E-commerce', 'Store administration', 'Operations'],
    },
    {
      index: '06',
      discipline: 'Engineering projects',
      company: 'Selected engineering projects',
      role: 'Independent Full Stack Developer',
      dates: 'Ongoing',
      location: 'Remote',
      summary: 'Independent product work spanning property-management SaaS, civic technology and legal AI.',
      bullets: [
        'PolykatoikiaOS: multi-role apartment management SaaS with recurring billing, payment adapters, maintenance workflows, voting and RBAC (Angular 22, NestJS 11, PostgreSQL 16, Prisma, Nx).',
        'Direct Democracy: municipal issue reporting with geospatial queries, Redis caching, background processing and an offline-first PWA (Angular 18, Express 5, PostGIS, BullMQ).',
        'NomosAI: legal-document RAG with citation-grounded search, subscriptions and Docker deployment (Angular 17, Node.js, PostgreSQL, pgvector, Ollama).',
      ],
      chips: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'AI / RAG'],
    },
  ];
}
