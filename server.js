const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

app.post('/chat', async (req, res) => {
    try {
        const mensajeUsuario = req.body.info;
        if (!mensajeUsuario) return res.status(400).json({ respuesta: "No hay mensaje." });

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres un NPC amigable en Roblox. Responde corto, divertido y en menos de 20 palabras." },
                { role: "user", content: mensajeUsuario }
            ],
            max_tokens: 50
        });

        res.json({ respuesta: response.choices.message.content });
    } catch (error) {
        res.status(500).json({ respuesta: "Error en el proxy." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Puerto ${PORT}`));
