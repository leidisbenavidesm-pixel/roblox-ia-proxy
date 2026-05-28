const express = require('express');
const app = express();

// Esto es obligatorio para que el servidor pueda leer el cuerpo del mensaje de Roblox
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Pon tu clave real de Google AI Studio aquí adentro
const genAI = new GoogleGenerativeAI("AIzaSyBMSMSHScIOcuRLJGjYA4iWUzmBbm91UnQ");

app.post('/chat', async (req, res) => {
    try {
        // Validación ultra segura para el mensaje
        let userMessage = "Hola";
        if (req.body && req.body.message) {
            userMessage = req.body.message;
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Eres un NPC de Roblox. Responde de forma muy amigable, entusiasta y corta."
        });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error en la IA:", error);
        res.status(500).json({ error: "Error de IA", detalle: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
