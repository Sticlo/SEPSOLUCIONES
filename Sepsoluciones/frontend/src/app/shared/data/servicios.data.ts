export interface Servicio {
  slug: string;
  nombre: string;
  descripcionCorta: string;
  descripcionSeo: string;
  keywords: string;
  icono: string;
  idealPara: string[];
  contenido: string[];
}

export const SERVICIOS: Servicio[] = [
  {
    slug: 'deteccion-de-fugas',
    nombre: 'Detección de Fugas sin Romper',
    descripcionCorta: 'Localizamos fugas ocultas con geófono digital y cámara industrial, sin demoler pisos ni paredes.',
    descripcionSeo: 'Detección de fugas de agua sin romper en Bogotá. Localizamos fugas ocultas con geófono digital y cámara industrial. Diagnóstico rápido, limpio y preciso. SEP Soluciones.',
    keywords: 'deteccion de fugas bogota, deteccion de fugas sin romper, deteccion de fugas agua bogota, deteccion de fugas bogota norte, deteccion de fugas chapinero, deteccion de fugas suba, plomero deteccion fugas bogota, empresa deteccion fugas bogota, servicio deteccion fugas bogota, geofono digital bogota, fugas ocultas bogota, filtraciones agua bogota, consumo anormal agua bogota, deteccion fugas a domicilio bogota, expertos deteccion fugas, deteccion fugas 24 horas bogota, deteccion filtraciones bogota, deteccion humedades bogota, plomeria deteccion fugas bogota precios',
    icono: '🔍',
    idealPara: ['Humedades', 'Filtraciones', 'Consumos anormales de agua'],
    contenido: [
      'Localizamos fugas ocultas con geófono digital y cámara industrial, sin demoler pisos ni paredes.',
      'Diagnóstico rápido, limpio y preciso que evita daños innecesarios y reduce significativamente los costos de reparación.',
      'Ideal para detectar humedades, filtraciones y consumos anormales de agua en hogares, edificios y locales comerciales.'
    ]
  },
  {
    slug: 'destape-de-tuberias',
    nombre: 'Destape de Tuberías Inmediato',
    descripcionCorta: 'Eliminamos obstrucciones en lavaplatos, sanitarios y sifones con sonda eléctrica profesional.',
    descripcionSeo: 'Destape de tuberías inmediato en Bogotá. Eliminamos obstrucciones en lavaplatos, sanitarios y sifones con sonda eléctrica profesional. Atención 24/7. SEP Soluciones.',
    keywords: 'destape de tuberias bogota, plomeria destapes bogota, servicio de destape bogota, destape de tuberias 24 horas bogota, destape tuberias bogota norte, destape tuberias suba, destape tuberias chapinero, destape tuberias kennedy, destape sanitarios bogota, destape lavaplatos bogota, destape sifones bogota, destape cañerias bogota, empresa de destapes bogota, plomero destapes bogota, urgencias destapes bogota, destape a domicilio bogota, sonda electrica bogota, destape de tuberias bogota precios, cuanto cuesta destape tuberias bogota, servicio de plomeria bogota destapes, plomeros en bogota norte destapes, expertos destapes bogota',
    icono: '🔧',
    idealPara: ['Hogares', 'Edificios', 'Locales comerciales'],
    contenido: [
      'Eliminamos obstrucciones en lavaplatos, sanitarios y sifones con sonda eléctrica profesional.',
      'Servicio ágil, sin suciedad y con garantía total en cada trabajo realizado.',
      'Atención 24 horas al día, 7 días a la semana para hogares, edificios y locales comerciales en toda Bogotá.'
    ]
  },
  {
    slug: 'inspeccion-de-tuberias',
    nombre: 'Inspección de Tuberías con Cámara',
    descripcionCorta: 'Inspeccionamos redes internas con cámaras de alta resolución, detectando fisuras, raíces u obstrucciones sin romper.',
    descripcionSeo: 'Inspección de tuberías con cámara en Bogotá. Detectamos fisuras, raíces y obstrucciones con cámaras de alta resolución sin romper. Informe visual incluido. SEP Soluciones.',
    keywords: 'inspeccion de tuberias con camara bogota, inspeccion tuberias bogota, video inspeccion tuberias bogota, camara para tuberias bogota, inspeccion de tuberias bogota norte, inspeccion tuberias chapinero, inspeccion tuberias suba, camara alta resolucion tuberias bogota, diagnostico tuberias bogota, plomero inspeccion tuberias bogota, empresa inspeccion tuberias, servicio inspeccion tuberias bogota, inspeccion de alcantarillado bogota, inspeccion redes hidraulicas bogota, camara inspeccion plomeria bogota, inspeccion tuberias a domicilio bogota, expertos inspeccion tuberias, inspeccion tuberias bogota precios',
    icono: '📹',
    idealPara: ['Diagnóstico técnico preciso', 'Evitar reparaciones innecesarias'],
    contenido: [
      'Inspeccionamos redes internas con cámaras de alta resolución, detectando fisuras, raíces u obstrucciones sin necesidad de romper.',
      'Diagnóstico técnico detallado que evita reparaciones innecesarias y ahorra tiempo y dinero.',
      'Incluye informe visual completo y asesoría profesional para la toma de decisiones informada.'
    ]
  },
  {
    slug: 'mantenimiento-para-empresas',
    nombre: 'Mantenimiento para Empresas',
    descripcionCorta: 'Planes preventivos y correctivos para redes hidráulicas, trampas de grasa, drenajes y tanques.',
    descripcionSeo: 'Mantenimiento hidráulico para empresas en Bogotá. Planes preventivos y correctivos para redes hidráulicas, trampas de grasa, drenajes y tanques. SEP Soluciones.',
    keywords: 'mantenimiento de plomeria para empresas bogota, mantenimiento hidraulico empresas bogota, empresa de plomeria para empresas bogota, servicio de plomeria para empresas bogota, mantenimiento preventivo plomeria bogota, mantenimiento correctivo plomeria empresas, plomeria para restaurantes bogota, plomeria para edificios bogota, plomeria para colegios bogota, mantenimiento trampas de grasa bogota, limpieza trampas de grasa bogota, mantenimiento drenajes empresas bogota, mantenimiento tanques agua bogota, plomeria comercial bogota, plomeria industrial bogota, empresa de mantenimiento hidraulico bogota, contratos mantenimiento plomeria bogota, plomeria para conjuntos residenciales, servicio de plomeria bogota empresas, mantenimiento plomeria edificios bogota',
    icono: '🏢',
    idealPara: ['Restaurantes', 'Clínicas', 'Colegios', 'Conjuntos residenciales'],
    contenido: [
      'Planes preventivos y correctivos para redes hidráulicas, trampas de grasa, drenajes y tanques.',
      'Garantizamos continuidad operativa y cumplimiento normativo para su empresa o institución.',
      'Servicio especializado para restaurantes, clínicas, colegios y conjuntos residenciales en Bogotá.'
    ]
  }
];
