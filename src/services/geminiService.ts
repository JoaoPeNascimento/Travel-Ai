// src/services/gemini.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiService = {
  getRecommendations: async (
    destination: string,
    startDate: string,
    endDate: string
  ) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Estou planejando uma viagem para ${destination} durante as datas de ${startDate} e ${endDate}.
      Quais atrações turísticas, pontos culturais, restaurantes famosos ou lugares únicos você recomenda visitar nesse período?
      Considere clima, estação do ano e eventos locais. Responda de forma organizada e objetiva. Entregue a resposta
      em um único paragráfo. 
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  },
};
