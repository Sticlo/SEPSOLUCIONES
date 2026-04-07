import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeoService } from '../../../core/services/seo.service';
import { ZONAS, Zona } from '../../../shared/data/zonas.data';
import { SERVICIOS } from '../../../shared/data/servicios.data';
import { CONTACT_INFO, whatsappLink } from '../../../shared/constants/contact-info';

@Component({
  selector: 'app-zona-detail',
  imports: [RouterLink],
  templateUrl: './zona-detail.html',
  styleUrl: './zona-detail.scss'
})
export default class ZonaDetail implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly contact = CONTACT_INFO;
  zona!: Zona;
  servicios = SERVICIOS;
  otrasZonas: Zona[] = [];
  whatsappUrl: string = CONTACT_INFO.whatsapp;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const slug = params.get('slug')!;
      this.loadZona(slug);
    });
  }

  private loadZona(slug: string): void {
    const found = ZONAS.find(z => z.slug === slug);
    if (!found) return;

    this.zona = found;
    this.whatsappUrl = whatsappLink(`Hola, necesito un plomero en ${found.nombre} y vine por la página web.`);
    this.otrasZonas = ZONAS.filter(z => z.slug !== slug).slice(0, 5);

    this.seo.updateSeo({
      title: `Plomero en ${this.zona.nombre}, Bogotá`,
      description: this.zona.descripcionSeo,
      keywords: this.zona.keywords,
      canonicalUrl: `/plomero-bogota/zonas/${slug}`
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Plumber',
        '@id': 'https://sepsolucioneselite.com/#organization',
        'name': `SEP Soluciones Élite - Plomería en ${this.zona.nombre}`,
        'description': this.zona.descripcionSeo,
        'url': `https://sepsolucioneselite.com/plomero-bogota/zonas/${slug}`,
        'telephone': CONTACT_INFO.phoneFormatted,
        'email': CONTACT_INFO.email,
        'image': 'https://sepsolucioneselite.com/plomero-bogota/images/og/logosepsolucionesblancoynegro.webp',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Bogotá',
          'addressRegion': 'Cundinamarca',
          'addressCountry': 'CO'
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': `${this.zona.nombre}, Bogotá`,
          'containedInPlace': {
            '@type': 'City',
            'name': 'Bogotá',
            'sameAs': 'https://es.wikipedia.org/wiki/Bogot%C3%A1'
          }
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        },
        'priceRange': '$$',
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '320',
          'bestRating': '5'
        },
        'makesOffer': this.servicios.slice(0, 6).map(s => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': s.nombre,
            'url': `https://sepsolucioneselite.com/plomero-bogota/servicios/${s.slug}`
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
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Zonas',
            'item': 'https://sepsolucioneselite.com/plomero-bogota/zonas'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': this.zona.nombre,
            'item': `https://sepsolucioneselite.com/plomero-bogota/zonas/${slug}`
          }
        ]
      }
    ]);

    globalThis.scrollTo?.({ top: 0 });
  }
}
