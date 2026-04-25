import { Component, OnInit, inject, afterNextRender, DestroyRef, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { SERVICIOS } from '../../shared/data/servicios.data';
import { ZONAS } from '../../shared/data/zonas.data';
import { CONTACT_INFO, whatsappLink } from '../../shared/constants/contact-info';
import { FAQ_DATA } from '../../shared/data/faq.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = whatsappLink('Hola, necesito un servicio de plomería y vine por la página web.');
  readonly servicios = SERVICIOS;
  readonly serviciosDestacados = SERVICIOS.filter(s =>
    ['destaqueos-y-desagues', 'deteccion-de-fugas', 'redes-hidraulicas-y-sanitarias', 'plomeria-restaurantes'].includes(s.slug)
  );
  readonly zonas = ZONAS.slice(0, 6);
  readonly faqItems = FAQ_DATA.slice(0, 6);

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

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Plomero en Bogotá ▷ 30 Min · 24/7 · Garantía Escrita',
      description: '¿Fuga, tubería tapada o sanitario desbordado en Bogotá? Llegamos en 30 min. Técnicos certificados, presupuesto gratis y garantía escrita. ☎ 314 815 3221',
      keywords: 'plomero bogota, plomeria bogota, plomero en bogota, plomero bogota 24 horas, plomero urgencias bogota, plomero a domicilio bogota, plomero barato bogota, plomero cerca de mi bogota, servicio de plomeria bogota, empresa de plomeria bogota, plomeria bogota 24 horas, urgencias plomeria bogota, plomero bogota norte, plomero bogota sur, plomeros en bogota usaquen, plomeros en bogota suba, plomeros en bogota chapinero, plomeros en bogota kennedy, plomeros en bogota engativa, destapes bogota, destape tuberias bogota, deteccion de fugas bogota, fuga de agua bogota, tuberia tapada bogota, plomero profesional bogota, plomero certificado bogota, plomero emergencias bogota, reparacion tuberias bogota',
      canonicalUrl: '/plomero-bogota'
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Plumber',
        '@id': 'https://sepsolucioneselite.com/#organization',
        'name': 'SEP Soluciones Élite',
        'alternateName': ['SEP Soluciones', 'SEP Plomeros Bogotá'],
        'description': 'Empresa de plomería profesional en Bogotá. Detección de fugas, destape de tuberías, inspección con cámara y mantenimiento para empresas. Atención 24/7.',
        'url': 'https://sepsolucioneselite.com/plomero-bogota/',
        'telephone': CONTACT_INFO.phoneFormatted,
        'email': CONTACT_INFO.email,
        'logo': 'https://sepsolucioneselite.com/plomero-bogota/images/og/logosepsolucionesblancoynegro.webp',
        'image': 'https://sepsolucioneselite.com/plomero-bogota/images/og/centrociudadbogota.webp',
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
        'currenciesAccepted': 'COP',
        'paymentAccepted': 'Efectivo, Transferencia bancaria, Nequi, Daviplata',
        'areaServed': {
          '@type': 'City',
          'name': 'Bogotá',
          'sameAs': 'https://es.wikipedia.org/wiki/Bogot%C3%A1'
        },
        'knowsAbout': [
          'Detección de fugas de agua', 'Destape de tuberías', 'Inspección con cámara CCTV',
          'Redes hidráulicas', 'Redes sanitarias', 'Plomería para restaurantes',
          'Mantenimiento preventivo', 'Emergencias de plomería 24/7'
        ],
        'slogan': 'Plomeros profesionales con garantía escrita en Bogotá',
        'foundingDate': '2014',
        'numberOfEmployees': { '@type': 'QuantitativeValue', 'minValue': 4, 'maxValue': 10 },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Servicios de Plomería en Bogotá',
          'itemListElement': this.servicios.map(s => ({
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': s.nombre,
              'description': s.descripcionCorta,
              'url': `https://sepsolucioneselite.com/plomero-bogota/servicios/${s.slug}`,
              'areaServed': { '@type': 'City', 'name': 'Bogotá' },
              'providerMobility': 'dynamic'
            }
          }))
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '87',
          'bestRating': '5',
          'worstRating': '1'
        },
        'review': [
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'Carlos Mendoza' },
            'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
            'reviewBody': 'Excelente servicio, llegaron en 25 minutos a solucionar una fuga en Chapinero. Muy profesionales y el precio fue justo.'
          },
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'María Ospina' },
            'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
            'reviewBody': 'Destaparon las tuberías de mi apartamento en Suba rápidamente. Limpiaron todo al terminar. 100% recomendados.'
          },
          {
            '@type': 'Review',
            'author': { '@type': 'Person', 'name': 'Andrés Torres' },
            'reviewRating': { '@type': 'Rating', 'ratingValue': '5' },
            'reviewBody': 'Detectaron una fuga oculta sin romper nada gracias a su tecnología. Muy eficientes y transparentes con el presupuesto.'
          }
        ],
        'sameAs': [
          CONTACT_INFO.whatsapp
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://sepsolucioneselite.com/#website',
        'name': 'SEP Soluciones Élite',
        'url': 'https://sepsolucioneselite.com',
        'publisher': { '@id': 'https://sepsolucioneselite.com/#organization' },
        'inLanguage': 'es-CO',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': 'https://sepsolucioneselite.com/plomero-bogota/servicios/{search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': this.faqItems.map(faq => ({
          '@type': 'Question',
          'name': faq.pregunta,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.respuesta
          }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://sepsolucioneselite.com/plomero-bogota/'
          }
        ]
      }
    ]);
  }
}
