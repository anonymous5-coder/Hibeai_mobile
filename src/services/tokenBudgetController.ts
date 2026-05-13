import { CanvasState } from '../models/canvasState';
import { snapshotState } from '../database';

const DAILY_CEILING = 500000;
const THRESHOLD = 0.80;

export class TokenBudgetController {
  static async enforceBudget(state: CanvasState, promptChars: number): Promise<CanvasState> {
    const estimatedTokens = Math.ceil(promptChars / 4);
    
    if (estimatedTokens > 100000) {
      throw new Error(`TokenBudgetExceeded: Prompt size ${estimatedTokens} exceeds 100,000 threshold.`);
    }

    const newUsage = state.dailyTokenUsage + estimatedTokens;
    let mutatedState = { ...state, dailyTokenUsage: newUsage };

    if (newUsage >= DAILY_CEILING * THRESHOLD) {
      mutatedState.circadianDeepSleep = true;
      mutatedState.isLocalInferenceActive = true;
    }

    await snapshotState(mutatedState);
    return mutatedState;
  }

  static async resetDailyUsage(state: CanvasState): Promise<CanvasState> {
    const mutatedState = { ...state, dailyTokenUsage: 0, circadianDeepSleep: false, isLocalInferenceActive: false };
    await snapshotState(mutatedState);
    return mutatedState;
  }
}
