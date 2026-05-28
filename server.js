const express = require('express');
const app = express();

app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI("AIzaSyC04WKXI2ANNDpuHsmPZ1gW6vccHAm00OI");

// Función simple para responder
async function hablar(req, res) {
    try {
        const userMessage = req.body.message || "Hola";
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de IA" });
    }
}

// Acepta la conexión como sea que la mande Roblox
app.use('/', hablar);
app.use('/chat', hablar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo`));
