import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { BLOG_POSTS, BlogPost } from '../../../shared/data/blog.data';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss'
})
export default class BlogDetail implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  post!: BlogPost;
  otrosPosts: BlogPost[] = [];

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    const found = BLOG_POSTS.find(p => p.slug === slug);
    if (!found) return;

    this.post = found;
    this.otrosPosts = BLOG_POSTS.filter(p => p.slug !== slug);

    this.seo.updateSeo({
      title: this.post.titulo,
      description: this.post.descripcionSeo,
      keywords: this.post.keywords,
      canonicalUrl: `/blog/${slug}`,
      ogType: 'article'
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': this.post.titulo,
        'description': this.post.descripcionSeo,
        'datePublished': this.post.fecha,
        'author': {
          '@type': 'Organization',
          'name': 'SEP Soluciones'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'SEP Soluciones',
          'url': 'https://www.sepsoluciones.com'
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
            'item': 'https://www.sepsoluciones.com/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blog',
            'item': 'https://www.sepsoluciones.com/blog'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': this.post.titulo,
            'item': `https://www.sepsoluciones.com/blog/${slug}`
          }
        ]
      }
    ]);
  }
}
