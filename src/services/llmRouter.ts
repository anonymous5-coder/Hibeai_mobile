import { EmergentClient } from './emergentClient';
import { LocalInferenceService } from './localInference';
import { ChatMessage } from '../models/canvasState';

export class LlmRouter {
  static async chat(
    systemPrompt: string, 
    history: ChatMessage[], 
    isLocalInferenceActive: boolean
  ): Promise<string> {
    if (isLocalInferenceActive) {
      const combinedPrompt = systemPrompt + "\n" + history.map(m => m.role + ": " + m.content).join("\n");
      return LocalInferenceService.generate(combinedPrompt);
    }
    return EmergentClient.chat(systemPrompt, history);
  }
}
