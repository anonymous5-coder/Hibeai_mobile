import { Platform } from 'react-native';

export class ImageCacheService {
  static async cacheImage(prompt: string, webUrl: string): Promise<string> {
    if (Platform.OS === 'web') return webUrl;
    try {
      const FileSystem = require('expo-file-system');
      const Crypto = require('expo-crypto');
      const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, prompt);
      const cachedUri = `${FileSystem.cacheDirectory}${hash}.jpg`;
      const fileInfo = await FileSystem.getInfoAsync(cachedUri);
      if (!fileInfo.exists) {
        await FileSystem.downloadAsync(webUrl, cachedUri);
      }
      return cachedUri;
    } catch (e) {
      return webUrl;
    }
  }

  static async getCachedImage(prompt: string): Promise<string | null> {
    if (Platform.OS === 'web') return null;
    try {
      const FileSystem = require('expo-file-system');
      const Crypto = require('expo-crypto');
      const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, prompt);
      const cachedUri = `${FileSystem.cacheDirectory}${hash}.jpg`;
      const fileInfo = await FileSystem.getInfoAsync(cachedUri);
      return fileInfo.exists ? cachedUri : null;
    } catch (e) {
      return null;
    }
  }
}
