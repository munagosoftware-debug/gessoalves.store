import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import FixedCTABar from '../components/FixedCTABar';
import CaptchaProvider from '../components/CaptchaProvider';
import JsonLd from '../components/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gessoalves | Especialista em Gesso e Drywall na Zona Sul de SP',
    template: '%s | Gessoalves'
  },
  description: 'Gessoalves: Referência em gesso acartonado, drywall, sancas e projetos de iluminação na Zona Sul de São Paulo. Efeitos 3D, agilidade e garantia.',
  keywords: ['gesso', 'drywall', 'sanca de gesso', 'forro de gesso', 'gesso 3d', 'zona sul sp', 'reforma'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gessoalves | Especialista em Gesso e Drywall',
    description: 'Transforme seu ambiente com a Gessoalves. Projetos em gesso e drywall de alta qualidade na Zona Sul de SP.',
    url: siteUrl,
    siteName: 'Gessoalves',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gessoalves",
    "image": `${siteUrl}/logo.png`,
    "description": "Especialistas em instalação de forro de gesso, drywall e sancas na Zona Sul de SP.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.6500,
      "longitude": -46.7000
    },
    "telephone": "+5511961155049",
    "priceRange": "$$",
    "areaServed": "Zona Sul de São Paulo"
  };

  return (
    <html lang="pt-BR">
      <body>
        <CaptchaProvider>
          <JsonLd data={localBusinessSchema} />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <FixedCTABar />
        </CaptchaProvider>
      </body>
    </html>
  );
}
