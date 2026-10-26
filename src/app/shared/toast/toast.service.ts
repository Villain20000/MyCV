import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  icon?: 'check' | 'copy' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly currentToast = signal<ToastMessage | null>(null);
  private timer: number | null = null;
  private nextId = 1;

  show(title: string, description?: string, icon: 'check' | 'copy' | 'info' = 'check'): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    const id = this.nextId++;
    this.currentToast.set({ id, title, description, icon });
    this.timer = window.setTimeout(() => {
      if (this.currentToast()?.id === id) {
        this.dismiss();
      }
    }, 2800);
  }

  dismiss(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentToast.set(null);
  }

  async copyText(text: string, successTitle = 'Copied to clipboard', description?: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      this.show(successTitle, description || text, 'check');
      return true;
    } catch {
      this.show('Failed to copy', 'Please copy manually', 'info');
      return false;
    }
  }
}
