const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const app = express();

app.use(express.json());

// Se conecta usando la clave que configuramos en Render
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).json({ error: "Sin mensaje" });

        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: userMessage,
            config: {
                // Aquí definimos la personalidad de tu NPC en Roblox
                systemInstruction: "Eres un NPC de Roblox. Responde de forma muy amigable, entusiasta y mantén tus respuestas muy cortas.",
                maxOutPutTokens: 300
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error de IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
