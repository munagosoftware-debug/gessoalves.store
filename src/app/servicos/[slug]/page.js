import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, MessageSquare, Sparkles, Layers } from 'lucide-react';
import { servicesData, getServiceBySlug } from '@/lib/servicesData';
import GallerySwiper from '@/components/GallerySwiper';
import GsapProvider from '@/components/GsapProvider';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Serviço não encontrado | Gessoalves',
    };
  }

  return {
    title: `${service.title} em SP | Gessoalves Drywall e Gesso`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Gessoalves`,
      description: service.description,
      url: `https://gessoalves.store/servicos/${service.slug}`,
      images: [{ url: service.placeholderImg }],
    },
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicoDetalhes({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <GsapProvider>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-beige, #f8f6f0)', paddingTop: '10.5rem', paddingBottom: '5rem' }}>
        <main style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Voltar */}
          <Link
            href="/servicos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-navy, #1b2a5c)',
              fontWeight: '700',
              fontSize: '0.9rem',
              marginBottom: '2rem',
              textDecoration: 'none',
              padding: '8px 16px',
              background: '#ffffff',
              borderRadius: '25px',
              border: '1px solid rgba(27, 42, 92, 0.1)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <ArrowLeft size={18} /> Voltar para todos os serviços
          </Link>

          {/* Card Principal */}
          <article
            style={{
              background: '#ffffff',
              padding: '2.5rem 2rem',
              borderRadius: '20px',
              border: '1px solid rgba(27, 42, 92, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
              marginBottom: '3rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span
                style={{
                  background: 'var(--color-navy, #1b2a5c)',
                  color: '#ffffff',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {service.badge || 'Serviço Especializado'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-silver-dark, #8a8a8a)', fontSize: '0.82rem', fontWeight: '600' }}>
                <Clock size={14} /> Execução: {service.avgTime || '2 a 4 dias'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-silver-dark, #8a8a8a)', fontSize: '0.82rem', fontWeight: '600' }}>
                <ShieldCheck size={14} /> Garantia: {service.warranty || '5 anos'}
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                color: 'var(--color-navy, #1b2a5c)',
                fontWeight: '800',
                lineHeight: '1.25',
                marginBottom: '1rem',
              }}
            >
              {service.title}
            </h1>

            <p style={{ color: 'var(--color-graphite, #4a4a4a)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {service.description}
            </p>

            {/* Imagem de Destaque */}
            <div style={{ position: 'relative', width: '100%', height: '380px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid rgba(27, 42, 92, 0.1)' }}>
              <Image
                src={service.placeholderImg}
                alt={service.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 960px) 100vw, 960px"
                priority
              />
            </div>

            {/* Diferenciais e Padrão de Qualidade */}
            <div style={{ background: 'var(--color-beige-light, #f8f6f0)', padding: '2rem', borderRadius: '14px', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-navy, #1b2a5c)', fontWeight: '800', marginBottom: '1.25rem' }}>
                Diferenciais e Padrão de Qualidade Gessoalves:
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {service.features.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--color-graphite, #374151)' }}>
                    <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card CTA */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-navy, #1b2a5c) 0%, #2a3f85 100%)',
                padding: '2.25rem 2rem',
                borderRadius: '16px',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(27, 42, 92, 0.2)',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4cc9f0', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <Sparkles size={16} /> Atendimento com Visita Gratuita
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                Pronto para instalar {service.title.toLowerCase()} no seu imóvel?
              </h3>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--color-silver-light, #e2e8f0)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Atendimento rápido na Zona Sul e toda a Grande SP com orçamento sob medida e garantia de 5 anos.
              </p>
              <WhatsAppCTAButton 
                message={`Olá! Gostaria de saber mais sobre ${service.title} e solicitar um orçamento sob medida.`} 
                className="btn-3d"
              >
                Solicitar Orçamento no WhatsApp
              </WhatsAppCTAButton>
            </div>
          </article>

          {/* Galeria de Fotos Relacionadas */}
          <section style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-navy, #1b2a5c)', marginBottom: '1.5rem', fontWeight: '800', textAlign: 'center' }}>
              Galeria de Obras e Exemplos
            </h2>
            <GallerySwiper />
          </section>

        </main>
      </div>
    </GsapProvider>
  );
}

