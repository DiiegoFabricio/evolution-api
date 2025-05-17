// server.js
const express = require("express");
const { create } = require("@open-wa/wa-automate");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let client = null;

create({
  sessionId: "evolution",
  multiDevice: true,
  authTimeout: 60,
  qrTimeout: 0,
  headless: true,
  logConsole: false,
  popup: false,
  cacheEnabled: false,
}).then((_client) => {
  client = _client;
  console.log("✅ Cliente WhatsApp pronto!");
});

// GET QR Code
app.get("/instance/qrcode", async (req, res) => {
  if (!client) return res.status(500).send("Cliente ainda não pronto");

  const qr = await client.getQrCode();
  res.send(`<img src="${qr}" alt="QRCode" />`);
});

// POST Enviar Mensagem
app.post("/message/send", async (req, res) => {
  const { number, message } = req.body;

  if (!client) return res.status(500).json({ error: "Cliente ainda não iniciado." });

  try {
    await client.sendText(number, message);
    console.log(`📤 Mensagem enviada para ${number}`);
    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    res.status(500).json({ success: false, error: error.toString() });
  }
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Evolution API pronta na porta ${PORT}`));
