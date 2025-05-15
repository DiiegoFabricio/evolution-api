const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Simula envio de mensagem
app.post("/message/send", (req, res) => {
  const { number, message } = req.body;

  console.log(`📤 Enviando mensagem para ${number}: ${message}`);

  // Aqui você integraria com a Evolution API real via Puppeteer ou socket
  res.json({ success: true, to: number });
});

// Porta padrão
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Evolution API pronta na porta ${PORT}`));
