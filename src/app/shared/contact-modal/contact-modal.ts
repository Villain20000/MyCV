import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ModalService } from '../../core/modal.service';
import { hideInner, slideUp, spring, type Spring } from '../../core/motion';
import { ScrollMotionService } from '../../core/scroll-motion.service';
import { CONTACT_EMAIL } from '../../core/site-data';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-contact-modal',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-modal.html',
})
export class ContactModal {
  private readonly injector = inject(Injector);
  private readonly motion = inject(ScrollMotionService);
  protected readonly modal = inject(ModalService);
  protected readonly email = CONTACT_EMAIL;

  private readonly bg = viewChild.required<ElementRef<HTMLElement>>('modalBg');
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('modalPanel');
  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');
  private readonly form = viewChild<ElementRef<HTMLFormElement>>('modalForm');

  protected readonly sending = signal(false);
  protected readonly sent = signal(false);
  protected readonly firstName = signal('there');
  protected readonly mailtoHref = signal(`mailto:${CONTACT_EMAIL}`);

  private bgSpring?: Spring;
  private panelSpring?: Spring;
  private timers: number[] = [];

  constructor() {
    afterNextRender(() => {
      this.bgSpring = spring(this.bg().nativeElement, { opacity: 0 }, { tension: 240, friction: 30 });
      this.panelSpring = spring(
        this.panel().nativeElement,
        { opacity: 0, y: 28, scale: 0.96 },
        { tension: 240, friction: 26 },
      );
      this.prepareTitle();
    });

    effect(() => {
      const open = this.modal.isOpen();
      untracked(() => this.applyOpenState(open));
    });
  }

  private prepareTitle(): void {
    const inners = Array.from(document.querySelectorAll<HTMLElement>('.modal__title .clip-in'));
    inners.forEach((inner) => hideInner(inner));
  }

  private applyOpenState(open: boolean): void {
    if (!this.bgSpring || !this.panelSpring) {
      return;
    }

    this.motion.lock('modal', open);

    if (open) {
      this.bgSpring.to({ opacity: 1 });
      this.panelSpring.to({ opacity: 1, y: 0, scale: 1 });
      const inners = Array.from(document.querySelectorAll<HTMLElement>('.modal__title .clip-in'));
      inners.forEach((inner, index) => slideUp(inner, { delay: index * 90, duration: 800 }));
      this.clearTimers();
      this.timers.push(window.setTimeout(() => this.nameInput()?.nativeElement.focus(), 120));
      return;
    }

    this.bgSpring.to({ opacity: 0 });
    this.panelSpring.to({ opacity: 0, y: 28, scale: 0.96 });
    this.clearTimers();
    this.timers.push(
      window.setTimeout(() => {
        this.form()?.nativeElement.reset();
        this.sent.set(false);
        this.sending.set(false);
      }, 350),
    );
  }

  protected close(): void {
    this.modal.close();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.modal.isOpen()) {
      this.close();
    }
  }

  protected submit(event: Event): void {
    event.preventDefault();
    if (this.sending()) {
      return;
    }

    const form = this.form()?.nativeElement;
    if (!form) {
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    this.sending.set(true);
    this.clearTimers();

    this.timers.push(
      window.setTimeout(() => {
        const first = name.split(' ')[0] || 'there';
        this.firstName.set(first.replace(/[<>&]/g, ''));
        this.sending.set(false);
        this.sent.set(true);

        const body = `${message}\n\nFrom ${name || 'Name not provided'}${email ? ` (${email})` : ''}`;
        this.mailtoHref.set(
          `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            `Hiring enquiry from ${name || 'your portfolio'}`,
          )}&body=${encodeURIComponent(body)}`,
        );
      }, 700),
    );
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers = [];
  }
}
