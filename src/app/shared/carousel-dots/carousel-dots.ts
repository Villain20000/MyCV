import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-carousel-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dots" [class.dots--light]="tone() === 'light'">
      @for (i of indexes(); track i) {
        <button
          type="button"
          class="dot"
          [attr.aria-label]="'Go to slide ' + (i + 1)"
          [attr.aria-current]="i === active() ? 'true' : 'false'"
          (click)="pick.emit(i)"
        >
          <i></i>
        </button>
      }
    </div>
  `,
})
export class CarouselDots {
  readonly count = input.required<number>();
  readonly active = input.required<number>();
  readonly tone = input<'dark' | 'light'>('dark');
  readonly pick = output<number>();

  protected readonly indexes = computed(() => Array.from({ length: this.count() }, (_, i) => i));
}
