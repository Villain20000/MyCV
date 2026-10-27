import { Injectable, signal } from '@angular/core';

/** Controls the portaled "Book a visit" / hire contact dialog. */
@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
