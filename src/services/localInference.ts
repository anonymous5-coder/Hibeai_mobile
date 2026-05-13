import { NativeModules } from 'react-native';
import { Sanitizer } from './sanitizer';

const LlamaModule = NativeModules.Llama;

export class LocalInferenceService {
  static async generate(prompt: string): Promise<string> {
    if (!LlamaModule) {
      const stubResponse = "Local LLaMA offline. This is a local generic response.";
      return Sanitizer.sanitizeCot(stubResponse);
    }
    const response = await LlamaModule.generate(prompt);
    return Sanitizer.sanitizeCot(response);
  }
}
