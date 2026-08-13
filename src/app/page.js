import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import styles from './page.module.css';
import GsapProvider from '@/components/GsapProvider';
import HeroSwiper from '@/components/HeroSwiper';
import ServiceCard3D from '@/components/ServiceCard3D';
import CounterUp from '@/components/CounterUp';
import PinnedBeforeAfter from '@/components/PinnedBeforeAfter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TestimonialsSwiper from '@/components/TestimonialsSwiper';
import FAQAccordion from '@/components/FAQAccordion';
import CoverageMap from '@/components/CoverageMap';
import PhotoCarousel from '@/components/PhotoCarousel';
import MarqueeBanner from '@/components/MarqueeBanner';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';
import { ShieldCheck, Clock, Sparkles, Award, Phone, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const MOCK_PHOTOS = [
  {
    id: 1,
    image_urls: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
    client_name: 'João Carlos',
    service_type: 'Sanca de Gesso Iluminada',
    bairro: 'Vila Mariana'
  },
  {
    id: 2,
    image_urls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    client_name: 'Mariana Silva',
    service_type: 'Forro Acartonado Clean',
    bairro: 'Itaim Bibi'
  },
  {
    id: 3,
    image_urls: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'],
    client_name: 'Roberto Nunes',
    service_type: 'Parede Drywall Acústica',
    bairro: 'Moema'
  },
  {
    id: 4,
    image_urls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    client_name: 'Amanda Costa',
    service_type: 'Molduras & Cortineiro',
    bairro: 'Pinheiros'
  },
  {
    id: 5,
    image_urls: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80'],
    client_name: 'Carlos Mendes',
    service_type: 'Forro Modular Comercial',
    bairro: 'Santo Amaro'
  },
  {
    id: 6,
    image_urls: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'],
    client_name: 'Luciana Farias',
    service_type: 'Rebaixamento de Teto',
    bairro: 'Morumbi'
  },
  {
    id: 7,
    image_urls: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'],
    client_name: 'Paulo Gustavo',
    service_type: 'Iluminação Embutida LED',
    bairro: 'Vila Madalena'
  },
  {
    id: 8,
    image_urls: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
    client_name: 'Empresa Alpha',
    service_type: 'Divisórias Corporativas',
    bairro: 'Av. Paulista'
  }
];

export const metadata = {
  title: 'Gessoalves | Instalação de Gesso, Drywall e Sancas em São Paulo',
  description: 'Referência em gesso acartonado, drywall, sancas decorativas e forros acústicos na Zona Sul e toda Grande SP. Mais de 12 anos de excelência com garantia de 5 anos.',
  openGraph: {
    title: 'Gessoalves | Instalação de Gesso e Drywall em SP',
    description: 'Transforme seu ambiente com a excelência do gesso e drywall. Orçamento rápido pelo WhatsApp.',
    url: 'https://gessoalves.store',
  },
};

export default async function Home() {
  const { data: dbPhotos } = await supabase
    .from('site_assets')
    .select('*')
    .eq('section', 'portfolio')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  const { data: dbBeforeAfter } = await supabase
    .from('site_assets')
    .select('*')
    .eq('section', 'beforeafter')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  let beforeAfterProjects = [];
  if (dbBeforeAfter && dbBeforeAfter.length > 0) {
    for (let i = 0; i < dbBeforeAfter.length; i += 2) {
      if (dbBeforeAfter[i] && dbBeforeAfter[i+1]) {
        beforeAfterProjects.push({
          title: dbBeforeAfter[i].title || 'Transformação',
          before: dbBeforeAfter[i].image_url,
          after: dbBeforeAfter[i+1].image_url,
          details: '',
        });
      }
    }
  }

  const { data: dbServices } = await supabase
    .from('site_assets')
    .select('*')
    .eq('section', 'services')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  let services = servicesData.map(s => ({ ...s }));

  if (dbServices && dbServices.length > 0) {
    dbServices.forEach((dbService, idx) => {
      if (services[idx]) {
        services[idx].placeholderImg = dbService.image_url;
        if (dbService.title) {
          services[idx].title = dbService.title;
        }
      }
    });
  }

  let photos = MOCK_PHOTOS.map(p => ({ ...p }));

  if (dbPhotos && dbPhotos.length > 0) {
    dbPhotos.forEach((dbPhoto, index) => {
      if (photos[index]) {
        photos[index].image_urls = [dbPhoto.image_url];
        if (dbPhoto.title) {
          photos[index].service_type = dbPhoto.title;
        }
      } else {
        photos.push({
          id: dbPhoto.id,
          image_urls: [dbPhoto.image_url],
          client_name: 'Cliente Gessoalves',
          service_type: dbPhoto.title || 'Portfólio',
          bairro: 'São Paulo'
        });
      }
    });
  }

  const bannerItemsDark = [
    'ORÇAMENTO RÁPIDO EM 30 MIN',
    'QUALIDADE PREMIUM CERTIFICADA',
    'DRYWALL RESIDENCIAL & COMERCIAL',
    'SANCAS ILUMINADAS COM LED',
    'ISOLAMENTO ACÚSTICO',
    '5 ANOS DE GARANTIA'
  ];

  const bannerItemsLight = [
    'TRANSFORME SEU AMBIENTE',
    'ATENDIMENTO PERSONALIZADO NO WHATSAPP',
    'OBRA 100% LIMPA E ORGANIZADA',
    'MATERIAIS CERTIFICADOS ABNT',
    'PONTUALIDADE RIGOROSA'
  ];

  return (
    <GsapProvider>
      <main className={styles.mainWrapper}>
        {/* HERO SECTION COM SWIPER */}
        <section style={{ width: '100%', margin: 0, padding: 0 }}>
          <div className="gsap-reveal" style={{ display: 'flex', width: '100%' }}>
            <HeroSwiper />
          </div>
        </section>

        {/* CONTADORES NUMÉRICOS ANIMADOS */}
        <section style={{ width: '100%', padding: 0 }}>
          <CounterUp />
        </section>

        {/* LETREIRO ANIMADO (DARK) */}
        <MarqueeBanner items={bannerItemsDark} variant="dark" />

        {/* CARROSSEL DE FOTOS EM DESTAQUE */}
        {photos && photos.length > 0 && (
          <section className={styles.sectionDark}>
            <div className={styles.container}>
              <div className={`${styles.sectionHeader} gsap-reveal`}>
                <div className={styles.sectionBadge}>
                  <span className={styles.pulseDot} />
                  Portfólio Real
                </div>
                <h2 className={styles.sectionTitle}>Nossas Obras Recentes</h2>
                <p className={styles.sectionSubtitle}>
                  Confira a precisão dos nossos acabamentos e a transformação entregue em imóveis residenciais e comerciais em São Paulo.
                </p>
              </div>
              <PhotoCarousel photos={photos} />
            </div>
          </section>
        )}

        {/* SERVIÇOS EM DESTAQUE COM TILT 3D */}
        <section className={styles.sectionGraphite}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} gsap-reveal`}>
              <div className={styles.sectionBadge}>
                <span className={styles.pulseDot} />
                Nossas Especialidades
              </div>
              <h2 className={styles.sectionTitle}>Soluções Completas em Gesso e Drywall</h2>
              <p className={styles.sectionSubtitle}>
                Passe o mouse ou toque nos cards para girar em 3D e descobrir as vantagens de cada serviço.
              </p>
            </div>

            <div className="gsap-stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {services.map((service, idx) => (
                <ServiceCard3D
                  key={service.slug}
                  title={service.title}
                  description={service.description}
                  iconIndex={idx}
                  slug={service.slug}
                  image={service.placeholderImg}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO PINADA COMPARATIVO ANTES / DEPOIS */}
        <PinnedBeforeAfter />

        {/* CARROSSEL COMPARATIVO ANTES / DEPOIS POR OBRA */}
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} gsap-reveal`}>
              <div className={styles.sectionBadge}>
                <span className={styles.pulseDot} />
                Transformação Real
              </div>
              <h2 className={styles.sectionTitle}>Antes & Depois Interativo por Obra</h2>
              <p className={styles.sectionSubtitle}>
                Arraste o divisor central para visualizar a transformação completa que executamos nos projetos.
              </p>
            </div>
            <BeforeAfterSlider projects={beforeAfterProjects} />
          </div>
        </section>

        {/* POR QUE ESCOLHER A GESSOALVES (DIFERENCIAIS) */}
        <section className={styles.sectionGraphite}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} gsap-reveal`}>
              <div className={styles.sectionBadge}>
                <span className={styles.pulseDot} />
                Nossos Diferenciais
              </div>
              <h2 className={styles.sectionTitle}>Por que a Gessoalves é a sua melhor escolha?</h2>
              <p className={styles.sectionSubtitle}>
                Trabalhamos com rigor técnico e compromisso total com a sua satisfação em cada metro instalado.
              </p>
            </div>

            <div className={`${styles.differentialsGrid} gsap-stagger-grid`}>
              <div className={styles.diffCard}>
                <div className={styles.diffIconBox}>
                  <Clock size={28} />
                </div>
                <h3 className={styles.diffTitle}>Pontualidade Rigorosa</h3>
                <p className={styles.diffText}>
                  Cumprimento estrito do cronograma combinado. Planejamento minucioso para entregar seu espaço sem atrasos.
                </p>
              </div>

              <div className={styles.diffCard}>
                <div className={styles.diffIconBox}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className={styles.diffTitle}>Garantia de 5 Anos</h3>
                <p className={styles.diffText}>
                  Segurança e tranquilidade total com termo de garantia formal para serviços estruturais e acabamentos.
                </p>
              </div>

              <div className={styles.diffCard}>
                <div className={styles.diffIconBox}>
                  <Award size={28} />
                </div>
                <h3 className={styles.diffTitle}>Materiais Certificados ABNT</h3>
                <p className={styles.diffText}>
                  Uso exclusivo de perfis em aço galvanizado e chapas acartonadas de primeira linha com alta durabilidade.
                </p>
              </div>

              <div className={styles.diffCard}>
                <div className={styles.diffIconBox}>
                  <Sparkles size={28} />
                </div>
                <h3 className={styles.diffTitle}>Obra Limpa e Organizada</h3>
                <p className={styles.diffText}>
                  Proteção completa de pisos e móveis com descarte ecológico responsável de todo o entulho gerado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREA DE ATUAÇÃO COM MAPA VISUAL */}
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <CoverageMap />
          </div>
        </section>

        {/* LETREIRO ANIMADO (LIGHT) */}
        <MarqueeBanner items={bannerItemsLight} variant="light" />

        {/* DEPOIMENTOS DE CLIENTES */}
        <section className={styles.sectionGraphite}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} gsap-reveal`}>
              <div className={styles.sectionBadge}>
                <span className={styles.pulseDot} />
                Depoimentos
              </div>
              <h2 className={styles.sectionTitle}>O que dizem os nossos clientes</h2>
              <p className={styles.sectionSubtitle}>
                Avaliações reais de clientes que já transformaram seus lares e empresas conosco.
              </p>
            </div>
            <TestimonialsSwiper />
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeader} gsap-reveal`}>
              <div className={styles.sectionBadge}>
                <span className={styles.pulseDot} />
                Tire suas Dúvidas
              </div>
              <h2 className={styles.sectionTitle}>Perguntas Frequentes</h2>
              <p className={styles.sectionSubtitle}>
                Principais esclarecimentos sobre prazos, materiais e orçamento para sua obra.
              </p>
            </div>
            <FAQAccordion />
          </div>
        </section>

        {/* SUPER CTA FINAL */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaGlow} />
          <div className={`${styles.ctaContainer} gsap-reveal`}>
            <h2 className={styles.ctaTitle}>
              Pronto para transformar seu espaço com a <span className={styles.ctaHighlight}>Gessoalves</span>?
            </h2>
            <p className={styles.ctaSubtitle}>
              Solicite um orçamento rápido e sem compromisso. Nossa equipe técnica está pronta para atendê-lo pelo WhatsApp agora mesmo.
            </p>

            <div className={styles.ctaButtons}>
              <WhatsAppCTAButton
                message="Olá! Gostaria de falar com um especialista da Gessoalves para solicitar um orçamento para o meu projeto."
                className={styles.ctaButtonPrimary}
              >
                Falar com Especialista no WhatsApp
              </WhatsAppCTAButton>

              <a href="tel:+5511961155049" className={styles.ctaButtonSecondary}>
                <Phone size={20} />
                (11) 96115-5049
              </a>
            </div>

            <div className={styles.ctaTrustTriggers}>
              <div className={styles.ctaTrustItem}>
                <CheckCircle2 size={16} color="var(--color-cyan)" />
                Atendimento rápido em até 30 min
              </div>
              <div className={styles.ctaTrustItem}>
                <CheckCircle2 size={16} color="var(--color-cyan)" />
                Orçamento gratuito e sem compromisso
              </div>
              <div className={styles.ctaTrustItem}>
                <CheckCircle2 size={16} color="var(--color-cyan)" />
                Atendimento em toda São Paulo e Região
              </div>
            </div>
          </div>
        </section>
      </main>
    </GsapProvider>
  );
}
