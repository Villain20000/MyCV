import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon/icon';
import { PageHero } from '../../shared/page-hero/page-hero';
import { PROJECTS, type ProjectDetail } from './projects-data';

type FilterKey = 'all' | 'product' | 'client' | 'healthtech';

const CATEGORY: Record<string, FilterKey> = {
  mysitenow: 'client',
  polykatoikiaos: 'product',
  'direct-democracy': 'product',
  nomosai: 'product',
  'metabio-healthtech': 'healthtech',
  'custom-ecommerce': 'client',
};

@Component({
  selector: 'app-projects',
  imports: [RouterLink, Icon, PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly filter = signal<FilterKey>('all');

  protected readonly filters: ReadonlyArray<{ key: FilterKey; label: string }> = [
    { key: 'all', label: 'All work' },
    { key: 'product', label: 'Independent products' },
    { key: 'client', label: 'Client work' },
    { key: 'healthtech', label: 'HealthTech' },
  ];

  protected readonly projects: readonly ProjectDetail[] = PROJECTS;

  protected readonly filtered = computed(() => {
    const key = this.filter();
    return key === 'all' ? this.projects : this.projects.filter((project) => CATEGORY[project.slug] === key);
  });

  protected readonly count = computed(() => this.filtered().length);
}
