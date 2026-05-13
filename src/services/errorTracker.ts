import * as Crypto from 'expo-crypto';
import { CanvasState } from '../models/canvasState';
import { snapshotState } from '../database';

export class ErrorTracker {
  static async handleError(error: Error, state: CanvasState): Promise<CanvasState> {
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, error.message);
    const newHashes = [...state.recentErrorHashes, hash].slice(-5);
    
    const count = newHashes.filter(h => h === hash).length;
    let mutatedState = { ...state, recentErrorHashes: newHashes };

    if (count >= 3) {
      if (mutatedState.localHistory) {
        mutatedState.localHistory.push({
          role: 'assistant',
          content: 'SYSTEM OVERRIDE: Repeated error detected. Re-evaluate the root cause before retrying.',
          timestamp: new Date().toISOString()
        });
      }
    } else {
      const budget = Math.max(0, state.errorBudget - 1);
      mutatedState.errorBudget = budget;
      if (budget === 0) {
        mutatedState.isCircuitBreakerActive = true;
        mutatedState.circuitBreakerUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      }
    }

    await snapshotState(mutatedState);
    return mutatedState;
  }
}
