import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        @for (copy of copies; track copy) {
          <div class="marquee-group">
            @for (item of items(); track item) {
              <span class="marquee-item">{{ item }}</span>
              <span class="marquee-sep">✦</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      border-block: 1px solid rgba(255, 255, 255, 0.11);
      background: rgba(255, 255, 255, 0.018);
    }

    .marquee {
      overflow: hidden;
      padding-block: clamp(16px, 1.8vw, 22px);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
    }

    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee-scroll 38s linear infinite;
    }

    .marquee-group {
      display: flex;
      flex: none;
      align-items: center;
    }

    .marquee-item {
      padding-inline: clamp(18px, 2.4vw, 36px);
      color: rgba(226, 238, 252, 0.72);
      font: 500 clamp(17px, 2.1vw, 29px) / 1 'Space Grotesk', sans-serif;
      letter-spacing: -0.035em;
      white-space: nowrap;
      transition: color 180ms cubic-bezier(0.16, 1, 0.3, 1), text-shadow 180ms ease, transform 180ms ease;
    }

    .marquee-sep {
      color: #89c7e8;
      font-size: 9px;
      opacity: 0.8;
    }

    @media (hover: hover) and (pointer: fine) {
      .marquee:hover .marquee-track {
        animation-play-state: paused;
      }

      .marquee-item:hover {
        color: #ffffff;
        text-shadow: 0 0 18px rgba(147, 197, 253, 0.45);
        transform: translateY(-1px);
      }
    }

    @keyframes marquee-scroll {
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee {
        overflow-x: auto;
        -webkit-mask-image: none;
        mask-image: none;
      }

      .marquee-track {
        animation: none;
      }

      .marquee-group {
        flex-wrap: wrap;
        row-gap: 12px;
      }

      .marquee-group:nth-child(2) {
        display: none;
      }
    }
  `,
})
export class TechMarquee {
  readonly items = input.required<readonly string[]>();
  protected readonly copies = [0, 1];
}
