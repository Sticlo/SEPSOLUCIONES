import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { BLOG_POSTS } from '../../../shared/data/blog.data';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss'
})
export default class BlogList implements OnInit {
  private readonly seo = inject(SeoService);
  readonly posts = BLOG_POSTS;

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Blog de Plomería - Consejos y Guías',
      description: 'Blog de plomería con consejos, guías y tips para el cuidado de las tuberías de su hogar en Bogotá. Información profesional de SEP Soluciones.',
      keywords: 'blog plomeria, consejos plomeria, tips plomeria bogota, guias plomeria hogar, como destapar tuberias, como detectar fugas, mantenimiento plomeria, almacenes de plomeria, curso de plomeria bogota, blog plomeria profesional bogota',
      canonicalUrl: '/blog'
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Blog de Plomería',
      'description': 'Artículos sobre consejos, guías y tips para el cuidado de las tuberías',
      'itemListElement': this.posts.map((post, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': post.titulo,
        'url': `https://www.sepsoluciones.com/blog/${post.slug}`,
        'datePublished': post.fecha,
        'description': post.extracto
      }))
    });
  }
}
