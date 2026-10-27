import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../core/site-data';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, Icon, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly toast = inject(ToastService);

  protected readonly email = CONTACT_EMAIL;
  protected readonly github = GITHUB_URL;
  protected readonly linkedin = LINKEDIN_URL;

  protected readonly projectTypes: readonly string[] = [
    'Full-stack web platform',
    'Angular frontend / UI',
    'E-commerce / storefront',
    'HealthTech / data workflow',
    'API / backend integration',
    'Something else',
  ];

  protected readonly budgetRanges: readonly string[] = [
    'Not sure yet',
    '< €2k',
    '€2k – €5k',
    '€5k – €15k',
    '€15k+',
    'Full-time role',
  ];

  private readonly draft: Record<string, string> = {
    name: '',
    email: '',
    type: this.projectTypes[0],
    budget: this.budgetRanges[0],
    message: '',
  };

  protected updateField(field: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    this.draft[field] = target?.value ?? '';
  }

  protected copyEmail(): void {
    this.toast.copyText(CONTACT_EMAIL, 'Email copied to clipboard', CONTACT_EMAIL);
  }

  protected sendEmail(event: SubmitEvent): void {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Project inquiry — ${this.draft['type']} (${this.draft['name'] || 'portfolio'})`,
    );
    const body = encodeURIComponent(
      `Name: ${this.draft['name']}\nEmail: ${this.draft['email']}\nType: ${this.draft['type']}\nBudget: ${this.draft['budget']}\n\n${this.draft['message']}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    this.toast.show('Opening your email app…', 'Your message is pre-filled — just press send.', 'info');
  }
}
