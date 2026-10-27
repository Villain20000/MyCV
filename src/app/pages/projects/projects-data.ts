export interface ProjectLink {
  label: string;
  href?: string;
  route?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  micro: string;
  description: string;
  image: string;
  alt: string;
  chips: string[];
  role: string;
  dates: string;
  location: string;
  stack: string[];
  action?: ProjectLink;
  imageLink?: string;
  screenshot?: boolean;
  nomos?: boolean;
  featured?: boolean;
  placeholder?: string;
  problem: string;
  whatBuilt: string[];
  architecture: string;
  challenges: string[];
  results: string[];
}

export const PROJECTS: readonly ProjectDetail[] = [
  {
    slug: 'mysitenow',
    title: 'MySiteNow',
    micro: 'Website builder · Softexpert (07/2018 – 01/2023)',
    description:
      'Contributed to the Angular SaaS website builder as well as the public-facing website and integration between both.',
    image: 'assets/dev-01.svg',
    alt: 'Abstract coding and interface illustration for MySiteNow',
    chips: ['Angular', 'Website builder', 'Platform integration', 'SaaS'],
    role: 'Full Stack Developer',
    dates: '07/2018 – 01/2023',
    location: 'Greece',
    stack: ['Angular', 'TypeScript', 'Node.js', 'Express', 'REST APIs', 'Figma'],
    action: { label: 'Visit MySiteNow ↗', href: 'https://mysitenow.gr/' },
    problem:
      'Small businesses needed a way to launch and manage websites without hiring developers for every change, while the editor itself had to stay fast and reliable as templates and blocks grew.',
    whatBuilt: [
      'Implemented website-editor functionality (blocks, templates, content editing) in Angular.',
      'Built integration between the SaaS editor and the public-facing marketing website.',
      'Delivered responsive, pixel-accurate interfaces from Figma designs.',
      'Implemented client-requested features and fixes through Trello-managed tasks.',
    ],
    architecture:
      'Angular SPA editor backed by Node.js/Express REST APIs. Shared component library for editor blocks, lazy-loaded feature modules for the builder vs. site settings, and API-driven publishing that renders the public website from the same content model.',
    challenges: [
      'Keeping the editor performant while rendering many draggable blocks and live previews.',
      'Maintaining consistency between editor state and the published public website.',
      'Translating pixel-accurate Figma designs into reusable, responsive components.',
    ],
    results: [
      'Shipped editor features used to build and publish real customer websites.',
      'Reduced design-to-production friction with reusable block components.',
      'Stable publishing flow between editor content and the public site.',
    ],
  },
  {
    slug: 'polykatoikiaos',
    title: 'PolykatoikiaOS',
    micro: 'Property Management SaaS · Independent Project',
    description:
      'Multi-role apartment management SaaS with recurring billing, payment adapters, maintenance workflows, voting and RBAC.',
    image: 'assets/dev-02.svg',
    alt: 'Abstract coding and interface illustration for PolykatoikiaOS',
    chips: ['Angular 22', 'NestJS 11', 'PostgreSQL 16', 'Prisma', 'Nx', 'RBAC'],
    role: 'Independent Full Stack Developer',
    dates: 'Ongoing · Independent',
    location: 'Remote',
    stack: ['Angular 22', 'NestJS 11', 'PostgreSQL 16', 'Prisma', 'Nx', 'RBAC'],
    action: { label: 'View GitHub profile ↗', href: 'https://github.com/Villain20000' },
    problem:
      'Apartment building management runs on spreadsheets, chat threads and paper notices — billing, maintenance and decisions get lost. The goal was a single multi-role SaaS for managers, residents and technicians.',
    whatBuilt: [
      'Designed multi-role workspaces (admin, manager, resident, technician) with RBAC.',
      'Built recurring billing with payment adapters and expense tracking.',
      'Implemented maintenance request workflows from report to resolution.',
      'Added building voting / polls and announcement flows.',
    ],
    architecture:
      'Nx monorepo with an Angular 22 frontend and NestJS 11 API. PostgreSQL 16 with Prisma ORM for billing, units, tickets and votes. JWT authentication, role guards on both API and UI routes, and adapter interfaces for payment providers.',
    challenges: [
      'Modeling recurring billing periods, late fees and per-unit allocation correctly.',
      'Keeping permissions strict across very different roles without duplicating logic.',
      'Designing maintenance workflows that work for non-technical residents.',
    ],
    results: [
      'End-to-end SaaS covering billing, maintenance, voting and roles.',
      'Type-safe Prisma data model ready for multi-building scale.',
      'Clean Nx structure separating app, API and shared contracts.',
    ],
  },
  {
    slug: 'direct-democracy',
    title: 'Direct Democracy',
    micro: 'CivicTech · Municipal Feedback · Actual screenshot',
    description:
      'Municipal issue reporting with geospatial queries, citizen participation, Redis caching, background processing, offline-first PWA and E2E testing.',
    image: 'assets/direct-democracy-screenshot.webp',
    alt: 'Actual Direct Democracy Mayor Dashboard screenshot showing municipal issue statistics, recent activity and navigation',
    chips: ['Angular 18', 'Express 5', 'PostGIS', 'Redis', 'BullMQ', 'PWA'],
    role: 'Independent Full Stack Developer',
    dates: 'Independent · Open source',
    location: 'Remote',
    stack: ['Angular 18', 'Express 5', 'PostgreSQL', 'PostGIS', 'Redis', 'BullMQ', 'PWA'],
    screenshot: true,
    featured: true,
    imageLink: 'https://github.com/Villain20000/Direct-Democracy-Municipal-Feedback-Issue-Tracker',
    action: {
      label: 'View GitHub repository ↗',
      href: 'https://github.com/Villain20000/Direct-Democracy-Municipal-Feedback-Issue-Tracker',
    },
    problem:
      'Citizens report potholes, lighting and waste issues through phone calls or scattered channels, so municipalities lose track. The project provides a single geospatial issue tracker with a mayor dashboard and citizen participation.',
    whatBuilt: [
      'Built municipal issue reporting with map-based location and category workflows.',
      'Implemented PostGIS geospatial queries for nearby issues and district filtering.',
      'Added mayor dashboard with statistics, recent activity and status management.',
      'Made the app an offline-first PWA with background sync for reports.',
      'Added Redis caching and BullMQ background jobs for notifications and heavy tasks.',
    ],
    architecture:
      'Angular 18 frontend (PWA, lazy routes) talking to an Express 5 REST API. PostgreSQL + PostGIS for issues and geospatial indexes, Redis for caching hot queries, BullMQ workers for email/push and image processing. E2E coverage for the report-to-resolution flow.',
    challenges: [
      'Making geospatial queries fast as issue volume grows (indexes, bounding boxes, caching).',
      'Handling offline reports and conflict-free sync when connectivity returns.',
      'Designing a dashboard that stays readable with hundreds of open issues.',
    ],
    results: [
      'Working report → triage → resolve loop with real dashboard screenshot.',
      'Sub-second list loads for common filters via Redis + PostGIS indexes.',
      'Offline-capable reporting with E2E-tested critical paths.',
    ],
  },
  {
    slug: 'nomosai',
    title: 'NomosAI',
    micro: 'LegalTech · Greek Legal AI Workspace · Actual screenshot',
    description:
      'Legal-document RAG with citation-grounded search, document processing, JWT authentication, subscriptions and Docker-based deployment.',
    image: 'assets/nomosai-screenshot.webp',
    alt: 'Actual NomosAI Greek-language legal assistant screenshot featuring conversation history, cited legal sources and response panel',
    chips: ['Angular 17', 'Node.js', 'PostgreSQL', 'pgvector', 'Ollama', 'RAG'],
    role: 'Independent Full Stack Developer',
    dates: 'Independent',
    location: 'Remote',
    stack: ['Angular 17', 'Node.js', 'PostgreSQL', 'pgvector', 'Ollama', 'Docker'],
    screenshot: true,
    nomos: true,
    placeholder: 'GitHub repository · Link coming soon',
    problem:
      'Greek legal research means digging through long documents where hallucinations are dangerous. NomosAI is a legal AI workspace that answers only with cited sources from the user’s own document corpus.',
    whatBuilt: [
      'Built document ingestion pipeline (PDF/text chunking, embeddings, pgvector storage).',
      'Implemented citation-grounded RAG chat with source excerpts per answer.',
      'Added JWT authentication, workspaces and subscription gating.',
      'Created conversation history with legal-source side panel (see screenshot).',
      'Containerized the full stack with Docker for one-command deployment.',
    ],
    architecture:
      'Angular 17 chat workspace + Node.js API. PostgreSQL with pgvector for embeddings, Ollama for local LLM inference, chunked document pipeline with metadata (law, article, page). Subscription checks run at the API layer before retrieval.',
    challenges: [
      'Preventing hallucinations by forcing every claim to map to a retrieved chunk.',
      'Chunking Greek legal text without breaking article context.',
      'Keeping local LLM latency acceptable with streaming responses.',
    ],
    results: [
      'Grounded answers with visible cited sources in the UI.',
      'Self-hostable stack (Postgres + Ollama + Docker) with no vendor lock-in.',
      'Subscription-ready workspace model for individuals and firms.',
    ],
  },
  {
    slug: 'metabio-healthtech',
    title: 'Metabio / HealthTech',
    micro: 'Healthcare & Biobanking · Metabio (11/2024 – Present)',
    description:
      'Independently owned 15 end-to-end features across e-MetaBio, e-MetaBank and e-MetaRes: patient management, GDPR-aligned eConsent, biospecimen traceability, specimen access, and Python laboratory integrations (HL7 v2, FHIR).',
    image: 'assets/dev-03.svg',
    alt: 'Abstract coding and interface illustration for Metabio / HealthTech',
    chips: ['Angular', 'Node.js', 'Healthcare workflows', 'Biobanking', 'HL7 v2 / FHIR'],
    role: 'Full Stack Software Engineer',
    dates: '11/2024 – Present',
    location: 'Thessaloniki, Greece',
    stack: ['Angular', 'Node.js', 'REST APIs', 'Python', 'HL7 v2', 'FHIR', 'ICD-11', 'AWS HealthLake'],
    action: { label: 'Explore HealthTech ↗', route: '/healthtech' },
    problem:
      'Healthcare and biobanking workflows combine sensitive patient data, consent rules, specimen logistics and lab integrations. Interfaces had to be redesigned for clarity without ever exposing real patient data.',
    whatBuilt: [
      'Led Angular frontend redesign across e-MetaBio, e-MetaBank and e-MetaRes.',
      'Independently owned 15 end-to-end features (patient management, advanced search, specimen access).',
      'Built GDPR-aligned eConsent and revocation flows with conditional logic.',
      'Implemented biospecimen traceability: exchange, shipments, receipt confirmation.',
      'Developed Python integration scripts for 70 lab analysis types (HL7 v2, FHIR, ICD-11).',
    ],
    architecture:
      'Angular frontends consuming Node.js REST APIs with JWT + RBAC. Conditional form engine for eConsent and data-access rules, advanced search with dynamic filters, and Python workers bridging LIS output (HL7 v2 / FHIR) into the platform, with AWS HealthLake alignment.',
    challenges: [
      'Modeling complex conditional workflows while keeping the UI understandable.',
      'Handling consent, access control and auditability without leaking data.',
      'Normalizing 70 different lab analysis formats into consistent records.',
    ],
    results: [
      '15 features shipped end-to-end across three products.',
      'Faster navigation of complex datasets via advanced search and filters.',
      'Reliable lab-data ingestion covered by Jest, Karma and Playwright tests.',
    ],
  },
  {
    slug: 'custom-ecommerce',
    title: 'Custom E-commerce',
    micro: 'Commerce & Logistics · Cactus Web (02/2023 – 10/2023) & Softexpert',
    description:
      'Developed custom full-stack e-commerce applications with PHP and Angular (product catalogs, carts, checkout, order management) and integrated Stripe and PayPal payment workflows.',
    image: 'assets/dev-04.svg',
    alt: 'Abstract coding and interface illustration for Custom E-commerce',
    chips: ['PHP', 'Angular', 'E-commerce', 'Stripe & PayPal', 'Logistics SaaS'],
    role: 'Full Stack Developer',
    dates: '02/2023 – 10/2023 · plus 2018–2023',
    location: 'Thessaloniki, Greece',
    stack: ['PHP', 'Angular', 'Node.js', 'Express', 'Stripe', 'PayPal', 'MySQL'],
    action: { label: 'Explore experience ↗', route: '/experience' },
    problem:
      'Off-the-shelf shops could not cover client-specific catalogs, checkout rules and logistics needs. Clients needed tailored storefronts plus a shipping/logistics SaaS (Logistis) and marketplace features.',
    whatBuilt: [
      'Built custom storefronts: catalogs, carts, checkout and order management (PHP + Angular).',
      'Integrated Stripe and PayPal payment workflows with order reconciliation.',
      'Contributed to a custom marketplace and the Logistis shipping/logistics SaaS.',
      'Built ERP-adjacent modules for invoicing, inventory and customer management.',
      'Wrote Python scripts to automate e-commerce product imports.',
    ],
    architecture:
      'Angular storefronts backed by PHP and Node.js/Express REST APIs with MySQL. Stripe/PayPal webhooks drive order state, while the logistics SaaS shares the same product/order domain model for shipping and tracking.',
    challenges: [
      'Keeping cart, payment and order states consistent across webhooks and retries.',
      'Supporting highly custom catalog and pricing rules per client.',
      'Bridging shop orders with shipping/logistics workflows in real time.',
    ],
    results: [
      'Multiple tailored storefronts shipped to production.',
      'Reliable Stripe/PayPal checkout with reconciled orders.',
      'Reusable logistics SaaS foundation for shipping workflows.',
    ],
  },
];

export function getProject(slug: string | null): ProjectDetail | undefined {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug);
}
