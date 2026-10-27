import { Injectable, signal } from '@angular/core';

/**
 * Tracks the intro loader. The hero waits for `ready` before it reveals,
 * exactly like the loader-gated hero on first paint.
 */
@Injectable({ providedIn: 'root' })
export class LoaderService {
  readonly ready = signal(false);
  readonly finished = signal(false);

  markReady(): void {
    this.ready.set(true);
  }

  markFinished(): void {
    this.finished.set(true);
  }
}
