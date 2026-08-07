import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog e Dicas sobre Gesso e Drywall | Gessoalves',
  description: 'Acompanhe nosso blog e fique por dentro das melhores dicas sobre instalação de drywall, isolamento acústico e decoração com gesso.',
};

export default function Blog() {
  // TODO: substituir por foto real antes do lançamento (em cada post abaixo)
  const posts = [
    {
      id: 1,
      title: 'Drywall x Gesso Acartonado: Existe Diferença?',
      excerpt: 'Descubra os termos corretos e entenda por que o drywall revolucionou a construção a seco.',
      date: '10 Out 2023',
      img: '/servicos/forro-acartonado.webp'
    },
    {
      id: 2,
      title: 'O que é Isolamento Acústico com Drywall?',
      excerpt: 'Aprenda como a lã de vidro ou lã de rocha dentro da parede de drywall pode acabar com o barulho entre os ambientes.',
      date: '22 Set 2023',
      img: '/servicos/parede-drywall.webp'
    },
    {
      id: 3,
      title: 'Vantagens do Rebaixamento de Teto',
      excerpt: 'Veja como o rebaixamento de teto pode embutir sua iluminação e transformar completamente a estética da sua sala.',
      date: '05 Set 2023',
      img: '/servicos/rebaixamento-teto.webp'
    }
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Blog Gessoalves</h1>
      
      <div className={styles.grid}>
        {posts.map(post => (
          <article key={post.id} className={styles.postCard}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2' }}>
              <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.postImage} style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.postContent}>
              <span className={styles.postDate}>{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link href="/blog/drywall-vs-gesso-acartonado" className="btn-3d" style={{ textAlign: 'center', width: '100%' }}>
                Ler Artigo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
