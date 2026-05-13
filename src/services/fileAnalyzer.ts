import { InteractionManager } from 'react-native';

export class FileAnalyzer {
  static analyze(fileContent: string): Promise<string> {
    return new Promise((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        const injected = `<SYSTEM_ARCHITECTURE_FILE>\n${fileContent}\n</SYSTEM_ARCHITECTURE_FILE>`;
        resolve(injected);
      });
    });
  }
}
