require('dotenv').config();
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/UsuarioRoutes');
const cors = require('cors');
const SimRoutes = require("./routes/SimRoutes")
const VerificacaoRouter = require("./routes/VerificacaoRouter")
const twilio = require('twilio');
const path = require('path');
app.use(cors());
app.use(express.json());
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// Envia código OTP via SMS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    try {
        const verification = await client.verify.v2
            .services(process.env.VERIFY_SERVICE_SID)
            .verifications.create({ to: phone, channel: 'sms' });
        res.json({ status: verification.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Verifica o código OTP
app.post('/check-otp', async (req, res) => {
    const { phone, code } = req.body;
    try {
        const check = await client.verify.v2
            .services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: phone, code });
        res.json({ status: check.status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use('/utilizador', usuarioRoutes);
app.use("/sim", SimRoutes);
app.use("/verificacao", VerificacaoRouter);
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
});
