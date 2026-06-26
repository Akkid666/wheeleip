let latestIp = null;

export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  if (req.method === "POST") {
    latestIp = ip;
    return res.json({ success: true, ip });
  }

  if (req.method === "GET") {
    return res.json({ latestIp });
  }

  res.status(405).end();
}