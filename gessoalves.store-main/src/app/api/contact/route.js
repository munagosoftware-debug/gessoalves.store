import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase';

// Instanciado dinamicamente no POST para evitar erro no build do Next.js se a chave não existir

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(10),
  recaptchaToken: z.string().min(1),
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Extrai dados textuais
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      recaptchaToken: formData.get('recaptchaToken'),
    };

    // Valida com Zod
    const validatedData = formSchema.parse(data);

    // Verifica reCAPTCHA
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validatedData.recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json({ error: 'Falha na verificação anti-spam' }, { status: 400 });
    }

    // Processa upload de arquivo (Opcional)
    const file = formData.get('file');
    let fileUrl = '';

    if (file && file.size > 0) {
      try {
        const supabase = createAdminClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `orcamentos/${fileName}`;
        
        // Converte file para Buffer/ArrayBuffer para upload
        const arrayBuffer = await file.arrayBuffer();
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('contact_files') // Certifique-se de que este bucket existe no Supabase
          .upload(filePath, arrayBuffer, {
            contentType: file.type,
          });

        if (uploadError) {
          console.error('Erro ao fazer upload no Supabase:', uploadError);
        } else {
          // Obtém URL pública (supondo que o bucket seja público ou que a URL possa ser gerada)
          const { data: publicUrlData } = supabase.storage.from('contact_files').getPublicUrl(filePath);
          fileUrl = publicUrlData.publicUrl;
        }
      } catch (err) {
        console.error('Falha no upload do arquivo (ignorando)', err);
      }
    }

    // Envia e-mail via Resend se a API Key estiver configurada
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Gessoalves Site <onboarding@resend.dev>', // Modifique para o seu domínio verificado no Resend
        to: [process.env.ADMIN_EMAIL || 'admin@gessoalves.store'],
        subject: `[Site] Novo Orçamento: ${validatedData.subject}`,
        html: `
          <h2>Novo Contato pelo Site</h2>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>E-mail:</strong> ${validatedData.email}</p>
          <p><strong>Telefone/WhatsApp:</strong> ${validatedData.phone}</p>
          <p><strong>Assunto:</strong> ${validatedData.subject}</p>
          <br/>
          <p><strong>Mensagem:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br/>')}</p>
          ${fileUrl ? `<br/><p><strong>Arquivo em Anexo (Planta):</strong> <a href="${fileUrl}">Clique aqui para baixar</a></p>` : ''}
        `,
      });
    } else {
      console.warn('⚠️ RESEND_API_KEY não configurada. E-mail de notificação não enviado.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na rota de contato:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
