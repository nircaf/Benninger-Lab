import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function getPublications() {
  const prompt = `Find real academic publications for the following researchers associated with the Felix Benninger lab at Rabin Medical Center (neurology):
  1. Felix Benninger
  2. Oded Shor
  3. Shelly Degani Schwalm
  4. Nir Cafri

  Return the data as a JSON array of objects with fields: title, authors, journal, year, link (if available, otherwise empty string), and researcher_name (the name from the list above).
  Focus on neurology, epilepsy, and related fields.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            authors: { type: Type.STRING },
            journal: { type: Type.STRING },
            year: { type: Type.INTEGER },
            link: { type: Type.STRING },
            researcher_name: { type: Type.STRING },
          },
          required: ["title", "authors", "journal", "year", "researcher_name"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
}

export { getPublications };
