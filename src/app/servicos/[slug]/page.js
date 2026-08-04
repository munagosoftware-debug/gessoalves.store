export default function ServicoDetalhe({ params }) {
  return (
    <div style={{ padding: '4rem 5%' }}>
      <h1>Serviço: {params.slug}</h1>
      <p>Estrutura da página de detalhe de serviço.</p>
    </div>
  );
}
