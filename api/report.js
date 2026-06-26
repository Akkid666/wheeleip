let latestIp = null;

export default function handler(req, res) {
  // Enable CORS so external scripts (like Python or other sites) can access it
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract the client's IP address
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  // POST: Save the sender's IP
  if (req.method === "POST") {
    latestIp = ip;
    return res.status(200).json({ success: true, ip });
  }

  // GET: Return the last saved IP
  if (req.method === "GET") {
    return res.status(200).json({ latestIp });
  }

  // Method Not Allowed
  return res.status(405).json({ error: "Method not allowed" });
}
