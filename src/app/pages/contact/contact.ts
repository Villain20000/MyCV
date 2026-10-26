import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, SpotlightDirective],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly toast = inject(ToastService);

  protected copyEmail(): void {
    this.toast.copyText('john89skg@gmail.com', 'Email copied to clipboard!', 'john89skg@gmail.com');
  }
}
