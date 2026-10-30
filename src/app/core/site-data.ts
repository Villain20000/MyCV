export const CONTACT_EMAIL = 'john89skg@gmail.com';
export const CONTACT_PHONE = '+30 694 000 0000';
export const GITHUB_URL = 'https://github.com/Villain20000';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ioannis-ioannidis-a18875156/';

export interface NavLink {
  label: string;
  path: string;
  index: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Work', path: '/projects', index: '01' },
  { label: 'Experience', path: '/experience', index: '02' },
  { label: 'HealthTech', path: '/healthtech', index: '03' },
  { label: 'About', path: '/about', index: '04' },
  { label: 'Contact', path: '/contact', index: '05' },
];

export interface StatItem {
  value: string;
  label: string;
}

export const STATS: readonly StatItem[] = [
  { value: '5+', label: 'Years building software' },
  { value: '15', label: 'Features owned end-to-end' },
  { value: '70', label: 'Lab analysis integrations' },
  { value: '4', label: 'Industries shipped in' },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIALS: readonly SocialLink[] = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
];
