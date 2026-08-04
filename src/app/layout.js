import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Gessoalves - Empresa de Gesso e Drywall',
  description: 'Instalação de forro de gesso acartonado, drywall e acabamentos em gesso na Zona Sul de São Paulo.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
