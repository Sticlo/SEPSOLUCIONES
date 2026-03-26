import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { ZONAS } from '../../../shared/data/zonas.data';

@Component({
  selector: 'app-zonas-list',
  imports: [RouterLink],
  templateUrl: './zonas-list.html',
  styleUrl: './zonas-list.scss'
})
export default class ZonasList implements OnInit {
  private readonly seo = inject(SeoService);
  readonly zonas = ZONAS;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Zonas de Servicio de Plomería en Bogotá',
      description: 'Cobertura de plomería profesional en todas las localidades de Bogotá: Usaquén, Chapinero, Suba, Kennedy, Engativá, Fontibón y más. Respuesta inmediata 24/7. SEP Soluciones.',
      keywords: 'plomero bogota norte, plomeria bogota norte, plomeros en bogota norte, plomeria en bogota norte, plomero chapinero, plomero suba, plomero usaquen, plomero kennedy, plomero engativa, plomero fontibon, zonas de cobertura plomeria bogota, plomero bogota todas las localidades, servicio de plomeria bogota suba, servicio de plomeria bogota chapinero, plomeria a domicilio bogota',
      canonicalUrl: '/zonas'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Zonas de Cobertura en Bogotá',
      'description': 'Localidades de Bogotá donde prestamos servicio de plomería profesional',
      'itemListElement': this.zonas.map((zona, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': `Plomería en ${zona.nombre}`,
        'url': `https://www.sepsoluciones.com/zonas/${zona.slug}`,
        'description': zona.descripcionSeo
      }))
    });
  }
}
