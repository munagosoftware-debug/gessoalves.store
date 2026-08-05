# Regras do Projeto (AGENTS.md)

- Sempre que for executar um comando no terminal ou realizar a edição de um arquivo, o agente DEVE ler as configurações presentes na pasta `.agents` e explicitamente perguntar ao usuário para prosseguir, aguardando a aprovação antes de aplicar as mudanças ou comandos.
- Sempre que for fazer alguma automação, design, mexer com frontend, backend ou qualquer coisa do tipo, o agente deve buscar um agente/skill que seja especialista no assunto solicitado e SÓ DEPOIS da confirmação do usuário (administrador do sistema) prosseguir com a implementação.
