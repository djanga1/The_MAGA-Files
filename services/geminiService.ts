
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallSummary: {
      type: Type.STRING,
      description: "A high-level academic summary of the findings based on the user's query and the provided data."
    },
    keyThemes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of the most prominent, recurring themes or topics discovered in the data relevant to the query."
    },
    emergingTrends: {
      type: Type.ARRAY,
      description: "Identify any new or evolving patterns, narratives, or tactics. Each trend should have a name, a description, and supporting data snippets.",
      items: {
        type: Type.OBJECT,
        properties: {
          trend: { type: Type.STRING, description: "A concise name for the trend." },
          description: { type: Type.STRING, description: "A detailed explanation of the trend and its significance." },
          supportingData: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A few direct snippets or phrases from the data that exemplify this trend."
          }
        },
        required: ["trend", "description", "supportingData"]
      }
    },
    notableQuotes: {
      type: Type.ARRAY,
      description: "Extract impactful or representative quotes from the newsletters that directly relate to the user's query. Provide context for each quote.",
      items: {
        type: Type.OBJECT,
        properties: {
          quote: { type: Type.STRING, description: "The verbatim quote." },
          context: { type: Type.STRING, description: "The source or context of the quote (e.g., newsletter title, date, or section)." }
        },
        required: ["quote", "context"]
      }
    },
    dataConnections: {
        type: Type.STRING,
        description: "An analysis of how different data points, themes, or trends connect to each other to form a larger narrative or pattern."
    }
  },
  required: ["overallSummary", "keyThemes", "emergingTrends", "notableQuotes", "dataConnections"]
};

export const analyzeNewsletterData = async (csvData: string, userQuery: string): Promise<AnalysisResult> => {
  const prompt = `
    Based on the following CSV data from a series of newsletters, please perform the requested analysis.
    
    User Query: "${userQuery}"

    CSV Data:
    ---
    ${csvData}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert data analyst and sociologist specializing in monitoring and analyzing extremist rhetoric, specifically white supremacy. You will be given a dataset in CSV format containing newsletter data. Your task is to analyze this data based on the user's prompt and provide clear, structured insights. The output must be in JSON format, strictly adhering to the provided schema. Do not include markdown formatting like ```json in your response.",
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a valid response from the Gemini API.");
  }
};
