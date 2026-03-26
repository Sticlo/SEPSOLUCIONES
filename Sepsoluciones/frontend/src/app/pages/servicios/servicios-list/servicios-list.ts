import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICIOS } from '../../../shared/data/servicios.data';

@Component({
  selector: 'app-servicios-list',
  imports: [RouterLink],
  templateUrl: './servicios-list.html',
  styleUrl: './servicios-list.scss'
})
export default class ServiciosList implements OnInit {
  private readonly seo = inject(SeoService);
  readonly servicios = SERVICIOS;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Servicios de Plomería en Bogotá',
      description: 'Servicios profesionales de plomería en Bogotá: detección de fugas sin romper, destape de tuberías 24/7, inspección con cámara y mantenimiento para empresas. SEP Soluciones.',
      keywords: 'servicios de plomeria bogota, servicio de plomeria bogota, servicios plomeros bogota, deteccion de fugas bogota, destape de tuberias bogota, inspeccion de tuberias con camara bogota, mantenimiento para empresas bogota, servicios de plomeria bogota 24 horas, empresa de plomeria bogota, servicios de plomeria a domicilio bogota, plomeria profesional bogota servicios',
      canonicalUrl: '/servicios'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Servicios de Plomería en Bogotá',
      'description': 'Servicios profesionales de plomería en Bogotá',
      'itemListElement': this.servicios.map((servicio, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': servicio.nombre,
        'url': `https://www.sepsoluciones.com/servicios/${servicio.slug}`,
        'description': servicio.descripcionCorta
      }))
    });
  }
}
