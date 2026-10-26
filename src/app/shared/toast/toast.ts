import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (toastService.currentToast(); as toast) {
      <div
        class="toast-container"
        role="status"
        aria-live="polite"
        (click)="toastService.dismiss()"
      >
        <div class="toast-card">
          <div class="toast-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="toast-body">
            <span class="toast-title">{{ toast.title }}</span>
            @if (toast.description) {
              <span class="toast-desc">{{ toast.description }}</span>
            }
          </div>
          <button
            type="button"
            class="toast-close"
            aria-label="Dismiss notification"
            (click)="toastService.dismiss()"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }

    .toast-container {
      position: fixed;
      bottom: clamp(20px, 4vw, 36px);
      left: 50%;
      translate: -50% 0;
      z-index: 9999;
      pointer-events: none;
      animation: toast-enter 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .toast-card {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      min-width: 280px;
      max-width: min(90vw, 420px);
      border-radius: 999px;
      background: rgba(14, 23, 38, 0.88);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
      border: 1px solid rgba(147, 197, 253, 0.32);
      box-shadow:
        0 20px 45px rgba(0, 0, 0, 0.55),
        0 0 28px rgba(96, 165, 250, 0.18),
        inset 0 1px 1px rgba(255, 255, 255, 0.25);
      cursor: pointer;
      user-select: none;
      transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), border-color 160ms ease;
    }

    .toast-card:hover {
      border-color: rgba(147, 197, 253, 0.55);
      transform: translateY(-2px);
    }

    .toast-card:active {
      transform: scale(0.975);
    }

    .toast-icon {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.16);
      color: #38bdf8;
      flex-shrink: 0;
    }

    .toast-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex-grow: 1;
      overflow: hidden;
    }

    .toast-title {
      font-size: 13.5px;
      font-weight: 600;
      color: #f1f5f9;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }

    .toast-desc {
      font-size: 12px;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .toast-close {
      display: grid;
      place-items: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: #94a3b8;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: color 140ms ease, background 140ms ease;
    }

    .toast-close:hover {
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.1);
    }

    @keyframes toast-enter {
      from {
        opacity: 0;
        translate: -50% 20px scale(0.94);
      }
      to {
        opacity: 1;
        translate: -50% 0 scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .toast-container {
        animation: none;
      }
    }
  `,
})
export class Toast {
  protected readonly toastService = inject(ToastService);
}
