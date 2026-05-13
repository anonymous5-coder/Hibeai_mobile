import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mutex } from 'async-mutex';
import { CanvasState, CanvasStateSchema } from './models/canvasState';
import { Config } from './config';

const dbMutex = new Mutex();

export async function snapshotState(canvas: CanvasState) {
  const release = await dbMutex.acquire();
  try {
    const stateString = JSON.stringify(canvas);
    await AsyncStorage.setItem('canvas_state', stateString);
  } finally {
    release();
  }
}

export async function loadState(): Promise<CanvasState> {
  const release = await dbMutex.acquire();
  try {
    const state = await AsyncStorage.getItem('canvas_state');
    if (state) {
      try {
        const parsed = JSON.parse(state);
        return CanvasStateSchema.parse(parsed);
      } catch (e) {
        console.error('State parse error:', e);
      }
    }
  } finally {
    release();
  }
  return CanvasStateSchema.parse({});
}
