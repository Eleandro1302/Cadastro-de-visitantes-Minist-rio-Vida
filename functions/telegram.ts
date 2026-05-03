import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // Apenas aceita POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { visitantes, nomes, whatsapp, origem, amigo } = JSON.parse(event.body || '{}');
    
    let token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    if (token?.toLowerCase().startsWith('bot')) {
      token = token.slice(3);
    }

    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!token || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Telegram integration not configured properly.' })
      };
    }

    if (!visitantes && !nomes && !whatsapp) {
       return {
         statusCode: 400,
         body: JSON.stringify({ success: false, error: 'Missing required fields.' })
       };
    }

    let mensagem = `📌 Novo visitante - Ministério Vida\n\n`;
    
    if (Array.isArray(visitantes)) {
      mensagem += `👥 Visitantes:\n`;
      visitantes.forEach((v: any, i: number) => {
        mensagem += `${i + 1}. ${v.nome}`;
        if (v.whatsapp) {
          mensagem += ` (📱 ${v.whatsapp})`;
        }
        mensagem += `\n`;
      });
    } else if (Array.isArray(nomes) && nomes.length > 1) {
      mensagem += `👥 Nomes:\n${nomes.map((n: string) => `- ${n}`).join('\n')}\n`;
      mensagem += `📱 WhatsApp: ${whatsapp}\n`;
    } else {
      const singleName = (Array.isArray(nomes) && nomes.length > 0) ? nomes[0] : (visitantes && visitantes[0]?.nome);
      mensagem += `👤 Nome: ${singleName}\n`;
      mensagem += `📱 WhatsApp: ${whatsapp || (visitantes && visitantes[0]?.whatsapp)}\n`;
    }
    
    mensagem += `🔎 Como conheceu: ${origem}\n`;

    if (amigo) {
      mensagem += `🤝 Indicado por: ${amigo}\n`;
    }

    mensagem += `\n✅ Consentimentos aceitos`;

    const payload = {
      chat_id: chatId.replace(/[^0-9-]/g, ''),
      text: mensagem,
    };

    const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: any = await result.json();

    if (data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: `Erro Telegram: ${data.description}` 
        })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Internal server error' })
    };
  }
};

export { handler };
