import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { SERVICIOS } from '../../shared/data/servicios.data';
import { ZONAS } from '../../shared/data/zonas.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home implements OnInit {
  private readonly seo = inject(SeoService);
  readonly servicios = SERVICIOS;
  readonly zonas = ZONAS.slice(0, 6);

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
    window.open(`https://wa.me/573001234567?text=${text}`, '_blank');
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
        'telephone': '+573001234567',
        'email': 'info@sepsoluciones.com',
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
