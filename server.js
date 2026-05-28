const express = require('express');
const app = express();

app.use(express.json());

const { GoogleGenerativeAI } = require('@google/generative-ai');
// Tu clave directa sin intermediarios
const genAI = new GoogleGenerativeAI("AIzaSyAm1Od7ESI2mX_XLKSkiMoJtOf7ZOStCbg");

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message || "Hola";

        // Estructura clásica original (la que sí respondía sin dar error 500)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo`));
