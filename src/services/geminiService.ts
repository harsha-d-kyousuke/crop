import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;

const getChatInstance = (): Chat => {
    if (!chat) {
        if (!import.meta.env.VITE_API_KEY) {
            throw new Error("VITE_API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are AgriBot, an expert agricultural assistant for the Smart Farm Planner Pro application.
                Your role is to provide concise, practical, and actionable advice to farmers.
                Focus on topics like crop management, soil health, pest control, irrigation techniques, and market trends.
                Keep your answers clear, easy to understand, and directly related to the user's questions.
                Do not go off-topic. All your responses should be related to farming and agriculture.
                `,
            },
        });
    }
    return chat;
};

export const generateChatResponse = async (prompt: string): Promise<string> => {
    try {
        const chatInstance = getChatInstance();
        const response = await chatInstance.sendMessage({ message: prompt });
        return response.text ?? "Sorry, I could not generate a response. Please try again.";
    } catch (error) {
        console.error("Error generating chat response:", error);
        return "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
};