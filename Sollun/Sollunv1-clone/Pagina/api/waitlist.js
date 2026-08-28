export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    res.status(400).json({ error: 'Email inválido' });
    return;
  }

  const phone  = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  if (!phone || !apikey) {
    res.status(500).json({ error: 'Serviço não configurado' });
    return;
  }

  const now  = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const text = encodeURIComponent(`📬 Novo lead Sollun!\n\nEmail: ${String(email).trim()}\nHorário: ${now}`);
  const url  = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apikey}`;

  const r = await fetch(url);
  if (!r.ok) {
    res.status(502).json({ error: 'Falha ao enviar notificação' });
    return;
  }

  res.status(200).json({ ok: true });
}
