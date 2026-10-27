import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../core/modal.service';
import { ScrollMotionService } from '../../core/scroll-motion.service';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../core/site-data';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  protected readonly modal = inject(ModalService);
  private readonly motion = inject(ScrollMotionService);

  protected readonly email = CONTACT_EMAIL;
  protected readonly github = GITHUB_URL;
  protected readonly linkedin = LINKEDIN_URL;

  protected readonly workLinks = [
    { label: 'Direct Democracy', path: '/projects/direct-democracy' },
    { label: 'NomosAI', path: '/projects/nomosai' },
    { label: 'PolykatoikiaOS', path: '/projects/polykatoikiaos' },
    { label: 'Metabio HealthTech', path: '/projects/metabio-healthtech' },
  ];

  protected readonly siteLinks = [
    { label: 'Selected work', path: '/projects' },
    { label: 'Experience', path: '/experience' },
    { label: 'HealthTech', path: '/healthtech' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  protected backToTop(): void {
    this.motion.scrollTo('body');
  }
}
