import { Component, OnInit, inject, afterNextRender, DestroyRef, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CONTACT_INFO } from '../../shared/constants/contact-info';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss'
})
export default class Nosotros implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  readonly contact = CONTACT_INFO;

  constructor() {
    afterNextRender(() => {
      this.initScrollAnimations();
    });
  }

  private initScrollAnimations(): void {
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = this.el.nativeElement.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
    if (!elements.length) return;

    elements.forEach((el: HTMLElement) => {
      el.classList.add('animate-init');
      const delay = el.dataset['animateDelay'];
      if (delay) el.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el: HTMLElement) => observer.observe(el));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Nosotros - Empresa de Plomería en Bogotá',
      description: 'Conozca a SEP Soluciones Élite: empresa de plomería profesional en Bogotá con más de 10 años de experiencia. Técnicos certificados, trabajo garantizado, atención 24/7.',
      keywords: 'sep soluciones bogota, empresa de plomeria bogota, empresa plomeria profesional bogota, plomeros profesionales bogota, quienes somos sep soluciones, plomeria bogota experiencia, expertos en plomeria bogota, mejor empresa plomeria bogota',
      canonicalUrl: '/nosotros'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'Sobre SEP Soluciones',
      'description': 'Empresa de plomería profesional en Bogotá con más de 10 años de experiencia.',
      'url': 'https://www.sepsoluciones.com/nosotros'
    });
  }
}
