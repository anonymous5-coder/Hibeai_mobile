import axios from 'axios';
import { Config } from '../config';
import { ChatMessage } from '../models/canvasState';

export class EmergentClient {
  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Config.emergent.apiKey}`,
    };
  }

  static async chat(systemPrompt: string, history: ChatMessage[]): Promise<string> {
    let retries = 0;
    while (retries < Config.emergent.maxRetries) {
      try {
        const response = await axios.post(
          `${Config.emergent.baseUrl}${Config.emergent.chatEndpoint}`,
          {
            model: "Gemini 3 Pro",
            messages: [
              { role: 'system', content: systemPrompt },
              ...history.map(m => {
                if (m.imageAttachment) {
                  return { role: m.role, content: [{ type: 'text', text: m.content }, { type: 'image_url', image_url: { url: m.imageAttachment } }] };
                }
                return { role: m.role, content: m.content };
              })
            ]
          },
          { headers: this.getHeaders(), timeout: Config.emergent.timeoutSeconds * 1000 }
        );
        return response.data?.choices?.[0]?.message?.content || "Mock successful reasoning...";
      } catch (error) {
        retries++;
        if (retries >= Config.emergent.maxRetries) {
          throw new Error('EmergentException: Circuit breaker active');
        }
        await new Promise(res => setTimeout(res, 2000 * Math.pow(2, retries - 1)));
      }
    }
    throw new Error('EmergentException');
  }

  static async generateImage(prompt: string): Promise<string> {
    let retries = 0;
    while (retries < Config.emergent.maxRetries) {
      try {
        const response = await axios.post(
          `${Config.emergent.baseUrl}${Config.emergent.imageEndpoint}`,
          {
            model: "Gemini Nano Banana",
            prompt: prompt
          },
          { headers: this.getHeaders(), timeout: Config.emergent.timeoutSeconds * 1000 }
        );
        return response.data?.data?.[0]?.url || "https://dummyimage.com/600x400/0d1117/58a6ff.png&text=Generated+Image";
      } catch (error) {
        retries++;
        if (retries >= Config.emergent.maxRetries) {
          throw new Error('EmergentException: Circuit breaker active');
        }
        await new Promise(res => setTimeout(res, 2000 * Math.pow(2, retries - 1)));
      }
    }
    throw new Error('EmergentException');
  }
}
