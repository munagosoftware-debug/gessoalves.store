'use client';

export default function CoverageMap() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h3 style={{ color: 'var(--color-navy)', fontSize: '1.8rem', marginBottom: '16px' }}>Área de Atuação</h3>
        <p style={{ color: 'var(--color-graphite)', lineHeight: '1.6' }}>
          Atendemos prioritariamente o <strong>Butantã e região de São Paulo</strong>. Abaixo estão alguns dos principais bairros onde atuamos com rapidez e eficiência.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        width: '100%',
        alignItems: 'start'
      }}>
        {/* Coluna dos Bairros */}
        <div style={{ 
          backgroundColor: '#FFF', 
          padding: '24px', 
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid var(--color-silver-light)'
        }}>
          <h4 style={{ color: 'var(--color-navy)', fontSize: '1.2rem', marginBottom: '8px', borderBottom: '2px solid var(--color-cyan)', paddingBottom: '8px' }}>Nossa Base</h4>
          <p style={{ color: 'var(--color-graphite)', marginBottom: '16px', fontWeight: 'bold' }}>
            📍 Rua Inquiririm, 687 - Vila Indiana (Butantã)
          </p>
          
          <h4 style={{ color: 'var(--color-navy)', fontSize: '1.1rem', marginBottom: '12px' }}>Raio de Atendimento</h4>
          <p style={{ color: 'var(--color-graphite)', marginBottom: '16px' }}>
            Atendemos <strong>exclusivamente num raio de até 20km</strong> a partir do nosso endereço.
          </p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '8px',
            color: '#666',
            fontSize: '0.95rem'
          }}>
            <li>✓ Butantã e Região</li>
            <li>✓ Morumbi</li>
            <li>✓ Pinheiros</li>
            <li>✓ Vila Mariana</li>
            <li>✓ E demais regiões dentro dos 20km</li>
          </ul>
        </div>

        {/* Coluna do Mapa */}
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '300px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          <iframe
            title="Área de Atuação Gessoalves - Raio de 20km"
            src="https://maps.google.com/maps?q=Rua%20Inquiririm,%20687%20-%20Vila%20Indiana,%20São%20Paulo&t=&z=11&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '350px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
