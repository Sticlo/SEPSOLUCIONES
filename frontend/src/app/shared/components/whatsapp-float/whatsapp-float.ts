import { Component, inject, afterNextRender, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_INFO, whatsappLink } from '../../constants/contact-info';

@Component({
  selector: 'app-whatsapp-float',
  imports: [CommonModule],
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.scss'
})
export class WhatsappFloat {
  private readonly destroyRef = inject(DestroyRef);
  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = whatsappLink('Hola, necesito información sobre sus servicios de plomería y vengo de la página web');
  readonly isVisible = signal(false);

  constructor() {
    afterNextRender(() => {
      // Show button after a short delay for better UX
      const timer = setTimeout(() => {
        this.isVisible.set(true);
      }, 1500);

      this.destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
