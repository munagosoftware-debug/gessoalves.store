import ReadingProgressBar from '@/components/ReadingProgressBar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Artigo | Blog Gessoalves',
  description: 'Dicas valiosas sobre instalação de gesso, drywall e iluminação na Zona Sul de SP.',
};

export default function BlogPost({ params }) {
  return (
    <>
      {/* Barra de Progresso de Leitura no Topo Fixo */}
      <ReadingProgressBar />

      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-navy)',
            fontWeight: '600',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={20} /> Voltar para o Blog
        </Link>

        <article className="metallic-card gsap-reveal" style={{ padding: '2.5rem 2rem', borderRadius: '16px' }}>
          <div className="metallic-screw screw-tl" />
          <div className="metallic-screw screw-tr" />
          <div className="metallic-screw screw-bl" />
          <div className="metallic-screw screw-br" />

          <span
            style={{
              background: 'var(--color-navy)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}
          >
            Guia Completo
          </span>

          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-navy)', marginTop: '1rem', lineHeight: '1.3' }}>
            Drywall x Gesso Acartonado: Guia Definitivo para sua Obra
          </h1>

          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Publicado em 10 de Outubro por Equipe Técnica Gessoalves • 5 min de leitura
          </p>

          <Image
            src="/servicos/forro-acartonado.webp"
            alt="Instalação de Drywall"
            width={1200}
            height={380}
            style={{
              width: '100%',
              height: '380px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '2rem',
            }}
            sizes="(max-width: 850px) 100vw, 850px"
            priority
          />

          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-graphite)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Quando se fala em reformas rápidas, limpas e modernas, a dúvida entre <strong>Drywall</strong> e <strong>Gesso Acartonado</strong> surge frequentemente. A verdade é que ambos referem-se ao mesmo sistema construtivo: chapas de gesso revestidas com papel acartonado estruturadas em perfis de aço galvanizado.
            </p>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)', margin: '2rem 0 1rem 0' }}>
              Principais Vantagens do Sistema Drywall
            </h2>

            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>Rapidez e Obra Limpa:</strong> Instalação até 60% mais rápida do que a alvenaria tradicional.
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>Isolamento Acústico Eficiente:</strong> Preenchimento interno com lã de rocha ou lã de vidro.
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <strong>Versatilidade em Iluminação:</strong> Facilidade para embutir spots LED, fiação e sancas abertas.
              </li>
            </ul>

            <p style={{ marginBottom: '1.5rem' }}>
              Além disso, a Gessoalves garante a fixação adequada com parafusos específicos para carga e tratamento das juntas com fita e massa para acabamento liso e homogêneo sem trincas.
            </p>

            <div
              style={{
                background: 'var(--color-beige-dark)',
                padding: '1.5rem',
                borderRadius: '12px',
                borderLeft: '4px solid var(--color-navy)',
                margin: '2rem 0',
              }}
            >
              <h3 style={{ margin: 0, color: 'var(--color-navy)' }}>Quer um projeto sob medida?</h3>
              <p style={{ margin: '0.5rem 0 1rem 0' }}>
                Fale com nossos especialistas e solicite um orçamento gratuito para sua residência ou empresa.
              </p>
              <Link href="https://wa.me/5511961155049" target="_blank" className="btn-3d">
                Solicitar Orçamento no WhatsApp
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
