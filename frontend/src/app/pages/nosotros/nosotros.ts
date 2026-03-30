import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss'
})
export default class Nosotros implements OnInit {
  private readonly seo = inject(SeoService);

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
