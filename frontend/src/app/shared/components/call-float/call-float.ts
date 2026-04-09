import { Component, inject, afterNextRender, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_INFO } from '../../constants/contact-info';

@Component({
  selector: 'app-call-float',
  imports: [CommonModule],
  templateUrl: './call-float.html',
  styleUrl: './call-float.scss'
})
export class CallFloat {
  private readonly destroyRef = inject(DestroyRef);
  readonly contact = CONTACT_INFO;
  readonly callUrl = `tel:+57${CONTACT_INFO.phone}`;
  readonly isVisible = signal(false);

  constructor() {
    afterNextRender(() => {
      const timer = setTimeout(() => {
        this.isVisible.set(true);
      }, 1500);

      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
