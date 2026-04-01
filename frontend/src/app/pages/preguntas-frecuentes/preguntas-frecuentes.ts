import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { FAQ_DATA } from '../../shared/data/faq.data';
import { CONTACT_INFO } from '../../shared/constants/contact-info';

@Component({
  selector: 'app-preguntas-frecuentes',
  imports: [RouterLink],
  templateUrl: './preguntas-frecuentes.html',
  styleUrl: './preguntas-frecuentes.scss'
})
export default class PreguntasFrecuentes implements OnInit {
  private readonly seo = inject(SeoService);
  readonly contact = CONTACT_INFO;
  readonly faqs = FAQ_DATA;
  expandedIndex: number | null = null;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Preguntas Frecuentes sobre Plomería',
      description: 'Preguntas frecuentes sobre servicios de plomería en Bogotá. Costos, tiempos de respuesta, garantía, zonas de cobertura, emergencias 24 horas y más. SEP Soluciones.',
      keywords: 'preguntas frecuentes plomeria bogota, faq plomeria, cuanto cuesta plomero bogota, plomeria bogota precios, plomero emergencia bogota, plomero bogota 24 horas, servicio de plomeria bogota precios, cuanto cobra plomero bogota, urgencias plomeria bogota',
      canonicalUrl: '/preguntas-frecuentes'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': this.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.pregunta,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.respuesta
        }
      }))
    });
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
