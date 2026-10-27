import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CONTACT_EMAIL } from '../../core/site-data';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PROJECTS, getProject } from '../projects/projects-data';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, Icon, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly email = CONTACT_EMAIL;

  protected readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly project = computed(() => getProject(this.slug() ?? null));
  protected readonly notFound = computed(() => !this.project());

  protected readonly titleLines = computed(() => {
    const title = this.project()?.title ?? 'Project';
    return title.includes(' / ') ? title.split(' / ') : [title];
  });

  protected readonly nextProject = computed(() => {
    const current = this.project();
    if (!current) {
      return PROJECTS[0];
    }
    const index = PROJECTS.findIndex((project) => project.slug === current.slug);
    return PROJECTS[(index + 1) % PROJECTS.length];
  });

  protected readonly prevProject = computed(() => {
    const current = this.project();
    if (!current) {
      return PROJECTS[PROJECTS.length - 1];
    }
    const index = PROJECTS.findIndex((project) => project.slug === current.slug);
    return PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  });

  constructor() {
    effect(() => {
      const project = this.project();
      const pageTitle = project ? `${project.title} — Case Study` : 'Project Not Found — Portfolio';
      const description = project?.description ?? 'Project case study not found.';

      this.title.setTitle(pageTitle);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: pageTitle });
      this.meta.updateTag({ property: 'og:description', content: description });
    });
  }
}
