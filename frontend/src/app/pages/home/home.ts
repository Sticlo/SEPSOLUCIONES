import { Component, OnInit, inject, afterNextRender, DestroyRef, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { SERVICIOS } from '../../shared/data/servicios.data';
import { ZONAS } from '../../shared/data/zonas.data';
import { CONTACT_INFO } from '../../shared/constants/contact-info';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  readonly contact = CONTACT_INFO;
  readonly servicios = SERVICIOS;
  readonly serviciosDestacados = SERVICIOS.filter(s =>
    ['destaqueos-y-desagues', 'deteccion-de-fugas', 'redes-hidraulicas-y-sanitarias', 'plomeria-restaurantes'].includes(s.slug)
  );
  readonly zonas = ZONAS.slice(0, 6);

  constructor() {
    afterNextRender(() => {
      this.initScrollAnimations();
      this.initCounterAnimations();
    });
  }

  private initCounterAnimations(): void {
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counters = this.el.nativeElement.querySelectorAll('[data-count]') as NodeListOf<HTMLElement>;
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private animateCounter(el: HTMLElement): void {
    const target = parseInt(el.dataset['count'] || '0', 10);
    const prefix = el.dataset['prefix'] || '';
    const suffix = el.dataset['suffix'] || '';
    const duration = 2200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  private initScrollAnimations(): void {
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = this.el.nativeElement.querySelectorAll('[data-animate]') as NodeListOf<HTMLElement>;
    if (!elements.length) return;

    elements.forEach(el => {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach(el => observer.observe(el));
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  formData = {
    nombre: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  };

  sendWhatsApp(): void {
    const { nombre, telefono, servicio, mensaje } = this.formData;
    const lines = [
      `Hola, soy *${nombre}*`,
      telefono ? `Mi teléfono: ${telefono}` : '',
      servicio ? `Servicio: ${servicio}` : '',
      mensaje ? `Mensaje: ${mensaje}` : ''
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`${this.contact.whatsapp}?text=${text}`, '_blank');
  }

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Plomería Profesional en Bogotá — Emergencias 24/7',
      description: 'SEP Soluciones Élite: plomería profesional en Bogotá. Detección de fugas, destape de tuberías, inspección con cámara y mantenimiento para empresas. Respuesta en menos de 60 minutos. Llámanos.',
      keywords: 'plomeria bogota, plomero bogota, servicio de plomeria bogota, empresa de plomeria bogota, plomeria bogota 24 horas, urgencias plomeria bogota 24 horas, plomeria a domicilio bogota, plomero bogota norte, plomeria bogota norte, plomeros en bogota norte, servicio de plomeria bogota suba, servicio de plomeria bogota chapinero, plomeria bogota precios, expertos en plomeria bogota, destapes bogota, deteccion de fugas bogota, plomero profesional bogota, emergencias plomeria bogota, plomeria bogotá, servicio de plomeria bogota 24 horas, plomeria en bogota norte',
      canonicalUrl: '/'
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Plumber',
        '@id': 'https://www.sepsoluciones.com/#organization',
        'name': 'SEP Soluciones Élite',
        'alternateName': 'SEP Soluciones',
        'description': 'Empresa de plomería profesional en Bogotá. Detección de fugas, destape de tuberías, inspección con cámara y mantenimiento para empresas. Atención 24/7.',
        'url': 'https://www.sepsoluciones.com',
        'telephone': CONTACT_INFO.phoneFormatted,
        'email': CONTACT_INFO.email,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Bogotá',
          'addressRegion': 'Cundinamarca',
          'addressCountry': 'CO'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 4.711,
          'longitude': -74.0721
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59'
          }
        ],
        'priceRange': '$$',
        'image': 'https://www.sepsoluciones.com/images/og/logosepsolucionesblancoynegro.webp',
        'areaServed': {
          '@type': 'City',
          'name': 'Bogotá'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Servicios de Plomería',
          'itemListElement': this.servicios.map(s => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': s.nombre,
              'description': s.descripcionCorta,
              'url': `https://www.sepsoluciones.com/servicios/${s.slug}`
            }
          }))
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'SEP Soluciones Élite',
        'url': 'https://www.sepsoluciones.com'
      }
    ]);
  }
}
