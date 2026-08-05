'use client';

export default function CoverageMap() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h3 style={{ color: 'var(--color-navy)', fontSize: '1.8rem', marginBottom: '16px' }}>Área de Atuação</h3>
        <p style={{ color: 'var(--color-graphite)', lineHeight: '1.6' }}>
          Atendemos prioritariamente a <strong>Zona Sul de São Paulo</strong>. Abaixo estão alguns dos principais bairros onde atuamos com rapidez e eficiência.
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
          <h4 style={{ color: 'var(--color-navy)', fontSize: '1.2rem', marginBottom: '16px', borderBottom: '2px solid var(--color-cyan)', paddingBottom: '8px' }}>Principais Bairros</h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0, 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px',
            color: 'var(--color-graphite)'
          }}>
            <li>📍 Santo Amaro</li>
            <li>📍 Morumbi</li>
            <li>📍 Vila Mariana</li>
            <li>📍 Saúde</li>
            <li>📍 Jabaquara</li>
            <li>📍 Ipiranga</li>
            <li>📍 Campo Belo</li>
            <li>📍 Moema</li>
            <li>📍 Interlagos</li>
            <li>📍 Socorro</li>
          </ul>
          <p style={{ marginTop: '24px', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
            * Caso seu bairro não esteja na lista, entre em contato.
          </p>
        </div>

        {/* Coluna do Mapa (Embed Google Maps via iframe usando 'Zona Sul de Sao Paulo') */}
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '300px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          <iframe
            title="Área de Atuação Gessoalves - Zona Sul SP"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116987.89269557404!2d-46.73278854406206!3d-23.6139151838615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a7f6cd004fd%3A0xc6c4f0b784a0d810!2sZona%20Sul%20de%20S%C3%A3o%20Paulo%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1714578120300!5m2!1spt-BR!2sbr"
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
