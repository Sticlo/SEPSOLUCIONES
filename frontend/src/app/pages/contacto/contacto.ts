import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { CONTACT_INFO, whatsappLink } from '../../shared/constants/contact-info';

@Component({
  selector: 'app-contacto',
  imports: [RouterLink],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export default class Contacto implements OnInit {
  private readonly seo = inject(SeoService);
  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = whatsappLink('Hola, vine por la página web y me gustaría solicitar un servicio de plomería.');

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Contacto - Plomero en Bogotá',
      description: 'Contacte a SEP Soluciones para servicios de plomería en Bogotá. Llámenos, escríbanos por WhatsApp o solicite una cotización en línea. Atención 24/7.',
      keywords: 'contacto plomero bogota, llamar plomero bogota, cotizacion plomeria bogota, whatsapp plomero bogota, plomeria a domicilio bogota, solicitar plomero bogota, urgencias plomeria bogota, servicio de plomeria bogota contacto, plomero bogota telefono, empresa de plomeria bogota contacto',
      canonicalUrl: '/plomero-bogota/contacto'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contacto - SEP Soluciones',
      'url': 'https://sepsolucioneselite.com/plomero-bogota/contacto'
    });
  }
}
