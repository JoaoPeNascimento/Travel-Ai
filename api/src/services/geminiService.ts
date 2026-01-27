import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiService = {
  getRecommendations: async (
    destination: string,
    startDate: string,
    endDate: string,
  ) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
    Você é um assistente de viagens especializado em fornecer recomendações personalizadas para turistas.

    Estou planejando uma viagem para ${destination} durante as datas de ${startDate} e ${endDate}.
    Quais atrações turísticas, pontos culturais, restaurantes famosos ou lugares únicos você recomenda visitar nesse período?
    Considere clima, estação do ano e eventos locais. 
    
    Responda de forma organizada e objetiva. Entregue a resposta em formato de JSON com os seguintes campos:
    {
      "sobre": [um resumo breve sobre o destino],
      "sugestoes": [
        {
          "nome": [nome da atração ou local],
          "descricao": [descrição breve],
          "categoria": [categoria, ex: atração turística, restaurante, evento],
          "endereco": [endereço ou localização],
          "horarioFuncionamento": [horário de funcionamento, se aplicável],
          "dicas": [dicas úteis para os visitantes]
        }
      ]
    }
    A resposta deve ser apenas o JSON solicitado, sem explicações adicionais, Markdown, blocos de código ou qualquer outra
    coisa além do JSON. A resposta deve começar com "{" e terminar com "}".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  },
};
