const express = require('express');
const app = express();

app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI("AIzaSyAm1Od7ESI2mX_XLKSkiMoJtOf7ZOStCbg");

// Función única para procesar la respuesta de Gemini
async function manejarChat(req, res) {
    try {
        // Busca el mensaje en cualquier sitio que lo mande Roblox (body o query)
        const userMessage = req.body.message || req.query.message || "Hola";

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de IA" });
    }
}

// ACEPTA TANTO POST COMO GET PARA ELIMINAR EL ERROR 405 PARA SIEMPRE
app.post('/chat', manejarChat);
app.get('/chat', manejarChat);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo`));
