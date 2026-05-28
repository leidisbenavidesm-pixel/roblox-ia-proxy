const express = require('express');
const app = express();

app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI("AIzaSyAm1Od7ESI2mX_XLKSkiMoJtOf7ZOStCbg");

app.post('/chat', async (req, res) => {
    try {
        // Validación directa y súper segura para Render
        const userMessage = (req.body && req.body.message) ? req.body.message : "Hola";

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo`));
