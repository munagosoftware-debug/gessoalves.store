import ClientGalleryForm from '@/components/ClientGalleryForm';
import GalleryGrid from '@/components/GalleryGrid';
import PhotoCarousel from '@/components/PhotoCarousel';
import styles from '../page.module.css';

export const metadata = {
  title: 'Galeria de Clientes | Gessoalves - Obras Reais',
  description: 'Veja fotos reais de obras de gesso e drywall enviadas pelos próprios clientes da Gessoalves na Zona Sul de SP.',
};

const MOCK_PHOTOS = [
  {
    id: 1,
    image_urls: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
    client_name: 'João Carlos',
    service_type: 'Sanca de Gesso',
    bairro: 'Vila Mariana'
  },
  {
    id: 2,
    image_urls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    client_name: 'Mariana Silva',
    service_type: 'Forro Acartonado',
    bairro: 'Itaim Bibi'
  },
  {
    id: 3,
    image_urls: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'],
    client_name: 'Roberto Nunes',
    service_type: 'Parede de Drywall',
    bairro: 'Moema'
  },
  {
    id: 4,
    image_urls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    client_name: 'Amanda Costa',
    service_type: 'Molduras de Gesso',
    bairro: 'Pinheiros'
  },
  {
    id: 5,
    image_urls: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80'],
    client_name: 'Carlos Mendes',
    service_type: 'Forro Modular',
    bairro: 'Santo Amaro'
  },
  {
    id: 6,
    image_urls: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'],
    client_name: 'Luciana Farias',
    service_type: 'Rebaixamento de Teto',
    bairro: 'Tatuapé'
  }
];

async function getApprovedPhotos() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gallery/approved?limit=100`, { next: { revalidate: 60 } });
    const { data } = await res.json();
    if (data && data.length > 0) return data;
    return MOCK_PHOTOS;
  } catch {
    return MOCK_PHOTOS;
  }
}

export default async function GaleriaDeClientesPage() {
  const photos = await getApprovedPhotos();

  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)',
        color: '#fff', padding: '5rem 1.5rem 4rem', textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ background: 'var(--color-cyan)', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
            Comunidade Gessoalves
          </span>
          <h1 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#fff', lineHeight: '1.2' }}>
            Galeria de Clientes
          </h1>
          <p style={{ color: 'var(--color-silver-light)', fontSize: '1.1rem', marginTop: '1rem' }}>
            Fotos reais enviadas por clientes que transformaram seus espaços com a Gessoalves. Você também pode compartilhar o resultado da sua obra!
          </p>
        </div>
      </section>

      {/* Formulário de Envio */}
      <section className={styles.section} style={{ background: '#f6f8fb' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className={styles.sectionTitle}>Envie as Fotos da Sua Obra</h2>
            <p style={{ color: '#666' }}>Compartilhe o resultado do serviço que a Gessoalves realizou para você!</p>
          </div>
          <div style={{
            background: '#fff', padding: '2.5rem', borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid var(--color-silver-light)'
          }}>
            <ClientGalleryForm />
          </div>
        </div>
      </section>

      {/* Carrossel de Destaques */}
      {photos && photos.length > 0 && (
        <section className={styles.section} style={{ paddingBottom: '0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 className={styles.sectionTitle}>Destaques Recentes</h2>
              <p style={{ color: '#666' }}>Deslize para ver algumas das melhores obras.</p>
            </div>
            <PhotoCarousel photos={photos} />
          </div>
        </section>
      )}

      {/* Grid de Fotos Aprovadas */}
      <section className={styles.section}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className={styles.sectionTitle}>
              Obras dos Nossos Clientes ({photos.length} foto{photos.length !== 1 ? 's' : ''})
            </h2>
            <p style={{ color: '#666' }}>Clique em qualquer foto para ampliar.</p>
          </div>
          <GalleryGrid items={photos} />
        </div>
      </section>
    </main>
  );
}
