import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending Telegram messages
  app.post('/api/telegram', async (req, res) => {
    try {
      const { visitantes, nomes, whatsapp, origem, amigo, consentimentos } = req.body;
      
      let token = process.env.TELEGRAM_BOT_TOKEN?.trim();
      // Remove o prefixo 'bot' caso o usuário tenha passado no token por engano
      if (token?.toLowerCase().startsWith('bot')) {
        token = token.slice(3);
      }

      const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

      if (!token || !chatId) {
        console.error('Telegram Bot Token or Chat ID not configured. Token length:', token?.length, 'ChatId:', chatId);
        return res.status(500).json({ success: false, error: 'Telegram integration not configured properly.' });
      }

      if (!visitantes && !nomes && !whatsapp) {
         return res.status(400).json({ success: false, error: 'Missing required fields.' });
      }

      let mensagem = `📌 Novo visitante - Ministério Vida\n\n`;
      
      if (Array.isArray(visitantes)) {
        mensagem += `👥 Visitantes:\n`;
        visitantes.forEach((v, i) => {
          mensagem += `${i + 1}. ${v.nome}`;
          if (v.whatsapp) {
            mensagem += ` (📱 ${v.whatsapp})`;
          }
          mensagem += `\n`;
        });
      } else if (Array.isArray(nomes) && nomes.length > 1) {
        mensagem += `👥 Nomes:\n${nomes.map(n => `- ${n}`).join('\n')}\n`;
        mensagem += `📱 WhatsApp: ${whatsapp}\n`;
      } else {
        const singleName = (Array.isArray(nomes) && nomes.length > 0) ? nomes[0] : (req.body.nome || (visitantes && visitantes[0]?.nome));
        mensagem += `👤 Nome: ${singleName}\n`;
        mensagem += `📱 WhatsApp: ${whatsapp || (visitantes && visitantes[0]?.whatsapp)}\n`;
      }
      
      mensagem += `🔎 Como conheceu: ${origem}\n`;

      if (amigo) {
        mensagem += `🤝 Indicado por: ${amigo}\n`;
      }

      mensagem += `\n✅ Consentimentos aceitos`;

      const payload = {
        chat_id: chatId.replace(/[^0-9-]/g, ''), // Força o chat_id a ter apenas números e sinal de menos
        text: mensagem,
      };

      console.log('Sending payload to Telegram:', JSON.stringify(payload));

      const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      if (data.ok) {
        res.json({ success: true });
      } else {
        console.error('Telegram API error response:', JSON.stringify(data, null, 2));
        
        let clientErrorMessage = `Erro do Telegram (${data.error_code}): ${data.description || 'Erro 400'}`;
        
        if (data.description && data.description.includes('chat not found')) {
          clientErrorMessage = 'Chat não encontrado! Verifique o Chat ID e certifique-se de que iniciou a conversa com o bot primeiro (se for um chat privado) ou que o bot foi adicionado ao grupo.';
        }

        res.status(400).json({ success: false, error: clientErrorMessage });
      }
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
