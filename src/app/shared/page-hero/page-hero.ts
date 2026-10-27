import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Navy hero used by every inner page: 01 / eyebrow, clip-mask stacked title,
 * lead paragraph and projected actions.
 */
@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="page-hero__grid" aria-hidden="true"></div>
      <div class="page-hero__bg" aria-hidden="true"></div>

      <span class="eyebrow eyebrow--light page-hero__eyebrow" data-inview data-y="14" data-delay="40">
        {{ eyebrow() }}
      </span>

      <h1 class="page-title" [attr.data-lines]="linesAttribute()" [attr.data-stagger]="stagger()">
        {{ lines().join(' ') }}
      </h1>

      <p class="page-lead" data-inview data-y="18" data-delay="160">{{ lead() }}</p>

      @if (note()) {
        <p class="note" style="color: rgba(255,255,255,.55)" data-inview data-y="14" data-delay="220">
          {{ note() }}
        </p>
      }

      <ng-content />
    </section>
  `,
})
export class PageHero {
  readonly eyebrow = input('');
  readonly lines = input.required<readonly string[]>();
  readonly lead = input('');
  readonly note = input('');
  readonly stagger = input(120);

  protected linesAttribute(): string {
    return this.lines().join('|');
  }
}
