import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (toastService.currentToast(); as toast) {
      <div class="toast" role="status" aria-live="polite" (click)="toastService.dismiss()">
        <span class="toast__icon">
          <app-icon [name]="toast.icon === 'copy' ? 'copy' : toast.icon === 'info' ? 'info' : 'check'" />
        </span>
        <div>
          <b>{{ toast.title }}</b>
          @if (toast.description) {
            <span>{{ toast.description }}</span>
          }
        </div>
      </div>
    }
  `,
})
export class Toast {
  protected readonly toastService = inject(ToastService);
}
