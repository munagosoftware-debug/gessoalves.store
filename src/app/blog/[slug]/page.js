import ReadingProgressBar from '@/components/ReadingProgressBar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Share2, Sparkles } from 'lucide-react';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';
import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  return {
    title: `${post.title} | Blog Gessoalves`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://gessoalves.store/blog/${post.slug}`,
      images: [{ url: post.img }],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

  if (!post) {
    notFound();
  }

  // Artigos relacionados (mesma categoria ou outros)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <>
      <ReadingProgressBar />

      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-beige, #f8f6f0)', paddingTop: '10.5rem', paddingBottom: '5rem' }}>
        <main style={{ maxWidth: '880px', margin: '0 auto', padding: '0 1.5rem' }}>
          
          {/* Link Voltar */}
          <Link
            href="/blog"
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
              transition: 'transform 0.2s ease',
            }}
          >
            <ArrowLeft size={18} /> Voltar para todos os artigos
          </Link>

          {/* Card Principal do Artigo */}
          <article
            style={{
              background: '#ffffff',
              padding: '2.5rem 2rem',
              borderRadius: '20px',
              border: '1px solid rgba(27, 42, 92, 0.08)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Meta Topo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
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
                {post.category}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-silver-dark, #8a8a8a)', fontSize: '0.82rem', fontWeight: '500' }}>
                <Clock size={14} /> {post.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-silver-dark, #8a8a8a)', fontSize: '0.82rem', fontWeight: '500' }}>
                <Calendar size={14} /> {post.date}
              </span>
            </div>

            {/* Título do Artigo */}
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
                color: 'var(--color-navy, #1b2a5c)',
                fontWeight: '800',
                lineHeight: '1.25',
                marginBottom: '1rem',
              }}
            >
              {post.title}
            </h1>

            {/* Autor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-graphite, #4a4a4a)', fontSize: '0.88rem', fontWeight: '600', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <User size={16} color="var(--color-navy, #1b2a5c)" />
              <span>Por {post.author}</span>
            </div>

            {/* Imagem de Capa */}
            <div style={{ position: 'relative', width: '100%', height: '380px', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid rgba(27, 42, 92, 0.1)' }}>
              <Image
                src={post.img}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 880px) 100vw, 880px"
                priority
              />
            </div>

            {/* Conteúdo do Artigo */}
            <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--color-graphite, #374151)' }}>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-navy, #1b2a5c)', fontWeight: '500', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                {post.excerpt}
              </p>

              <div style={{ whiteSpace: 'pre-line' }}>
                {post.content}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy, #1b2a5c)' }}>Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'var(--color-beige-light, #f1e9dc)',
                        color: 'var(--color-navy, #1b2a5c)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Card WhatsApp CTA */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--color-navy, #1b2a5c) 0%, #2a3f85 100%)',
                  padding: '2.25rem 2rem',
                  borderRadius: '16px',
                  marginTop: '3rem',
                  color: '#ffffff',
                  boxShadow: '0 10px 30px rgba(27, 42, 92, 0.2)',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4cc9f0', fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} /> Atendimento Especializado
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                  Gostou deste conteúdo e quer aplicar no seu projeto?
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', color: 'var(--color-silver-light, #e2e8f0)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Envie sua planta ou agende uma visita técnica gratuita na Zona Sul e Grande SP. Nossa equipe analisa os detalhes sem compromisso.
                </p>
                <WhatsAppCTAButton
                  message={`Olá! Li o artigo "${post.title}" no blog e gostaria de falar com um especialista para solicitar um orçamento.`}
                  className="btn-3d"
                >
                  Falar com um Especialista no WhatsApp
                </WhatsAppCTAButton>
              </div>

            </div>
          </article>

          {/* Artigos Relacionados */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-navy, #1b2a5c)', marginBottom: '1.5rem' }}>
                Artigos Recomendados
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {relatedPosts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    style={{
                      background: '#ffffff',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid rgba(27, 42, 92, 0.08)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '160px' }}>
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-navy, #1b2a5c)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-navy, #1b2a5c)', lineHeight: '1.35', marginBottom: '0.5rem' }}>
                        {item.title}
                      </h3>
                      <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-navy, #1b2a5c)' }}>
                        <span>Ler mais</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}

