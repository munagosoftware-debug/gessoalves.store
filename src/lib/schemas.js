import { z } from 'zod';

// Schema base para validação do formulário de contato (shared client + server)
export const contactFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  subject: z.string().min(3, 'Assunto obrigatório'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

// Schema estendido para o server (inclui recaptchaToken)
export const contactApiSchema = contactFormSchema.extend({
  recaptchaToken: z.string().min(1),
});
