const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'frontend' });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found on frontend service' });
  }

  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend listening on port ${PORT}`);
});
