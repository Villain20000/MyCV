import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { STATS, type StatItem } from '../../core/site-data';

@Component({
  selector: 'app-stat-band',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'stats' },
  template: `
    <dl>
      @for (item of items(); track item.label; let i = $index) {
        <div class="stat" data-inview [attr.data-delay]="i * 110" [attr.data-y]="30">
          <dt class="sr-only">{{ item.label }}</dt>
          <dd>
            <b>{{ item.value }}</b>
            <span aria-hidden="true">{{ item.label }}</span>
          </dd>
        </div>
      }
    </dl>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StatBand {
  readonly items = input<readonly StatItem[]>(STATS);
}
