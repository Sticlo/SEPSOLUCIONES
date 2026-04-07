import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICIOS, Servicio } from '../../../shared/data/servicios.data';
import { CONTACT_INFO, whatsappLink } from '../../../shared/constants/contact-info';

@Component({
  selector: 'app-servicio-detail',
  imports: [RouterLink],
  templateUrl: './servicio-detail.html',
  styleUrl: './servicio-detail.scss'
})
export default class ServicioDetail implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly contact = CONTACT_INFO;
  servicio!: Servicio;
  otrosServicios: Servicio[] = [];
  whatsappUrl: string = CONTACT_INFO.whatsapp;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const slug = params.get('slug')!;
      this.loadServicio(slug);
    });
  }

  private loadServicio(slug: string): void {
    const found = SERVICIOS.find(s => s.slug === slug);
    if (!found) return;

    this.servicio = found;
    this.whatsappUrl = whatsappLink(`Hola, necesito un servicio de ${found.nombre} y vine por la página web.`);
    this.otrosServicios = SERVICIOS
      .filter(s => s.categoria === found.categoria && s.slug !== slug)
      .slice(0, 5);

    this.seo.updateSeo({
      title: `${this.servicio.nombre} en Bogotá`,
      description: this.servicio.descripcionSeo,
      keywords: this.servicio.keywords,
      canonicalUrl: `/plomero-bogota/servicios/${slug}`
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': this.servicio.nombre,
        'description': this.servicio.descripcionSeo,
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'SEP Soluciones',
          'telephone': CONTACT_INFO.phoneFormatted,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Bogotá',
            'addressCountry': 'CO'
          }
        },
        'areaServed': {
          '@type': 'City',
          'name': 'Bogotá'
        }
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
            'name': 'Servicios',
            'item': 'https://sepsolucioneselite.com/plomero-bogota/servicios'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': this.servicio.nombre,
            'item': `https://sepsolucioneselite.com/plomero-bogota/servicios/${slug}`
          }
        ]
      }
    ]);

    globalThis.scrollTo?.({ top: 0 });
  }
}
