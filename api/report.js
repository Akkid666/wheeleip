let latestIp = null;

export default function handler(req, res) {
  // Aktivera CORS så att spelet och Python kan prata med servern utan blockeringar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Hantera CORS preflight-förfrågningar
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hitta klientens IP-adress
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  // POST: Ta emot och spara IP från HTML-spelet
  if (req.method === "POST") {
    latestIp = ip;
    return res.status(200).json({ success: true, ip });
  }

  // GET: Skicka vidare den senaste sparade IP-adressen till Python
  if (req.method === "GET") {
    return res.status(200).json({ latestIp });
  }

  return res.status(405).json({ error: "Metoden tillåts inte" });
}
