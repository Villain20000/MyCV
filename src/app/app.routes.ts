import { Routes } from '@angular/router';

export interface PageMeta {
  title: string;
  description: string;
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home),
    data: {
      title: 'Full-Stack Developer — Portfolio',
      description:
        'Full-stack developer specializing in Angular, TypeScript, PHP and scalable web applications, from custom e-commerce to HealthTech platforms.',
    } satisfies PageMeta,
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then((module) => module.Projects),
    data: {
      title: 'Selected Work — Developer Portfolio',
      description: 'Selected Angular, PHP and full-stack projects.',
    } satisfies PageMeta,
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/experience/experience').then((module) => module.Experience),
    data: {
      title: 'Experience — Developer Portfolio',
      description:
        'Full-stack professional experience including HealthTech and digital agency work.',
    } satisfies PageMeta,
  },
  {
    path: 'healthtech',
    loadComponent: () => import('./pages/healthtech/healthtech').then((module) => module.Healthtech),
    data: {
      title: 'HealthTech Engineering — Developer Portfolio',
      description:
        'HealthTech and biobanking software engineering experience: patient workflows, eConsent, access controls and data discovery.',
    } satisfies PageMeta,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((module) => module.About),
    data: {
      title: 'About — Developer Portfolio',
      description: 'About my software engineering experience and approach.',
    } satisfies PageMeta,
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((module) => module.Contact),
    data: {
      title: 'Contact — Developer Portfolio',
      description: 'Connect about Angular and full-stack engineering opportunities.',
    } satisfies PageMeta,
  },
  { path: 'index.html', pathMatch: 'full', redirectTo: '' },
  { path: 'projects.html', pathMatch: 'full', redirectTo: 'projects' },
  { path: 'experience.html', pathMatch: 'full', redirectTo: 'experience' },
  { path: 'healthtech.html', pathMatch: 'full', redirectTo: 'healthtech' },
  { path: 'about.html', pathMatch: 'full', redirectTo: 'about' },
  { path: 'contact.html', pathMatch: 'full', redirectTo: 'contact' },
  { path: '**', redirectTo: '' },
];
