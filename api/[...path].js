export default async function handler(req, res) {
  const targetUrl = `https://web-production-5954e.up.railway.app${req.url}`;

  const options = {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = JSON.stringify(req.body);
  }

  const response = await fetch(targetUrl, options);
  const data = await response.json();
  res.status(response.status).json(data);
}
