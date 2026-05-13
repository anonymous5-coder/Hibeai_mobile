import { CanvasState } from '../models/canvasState';
import { loadState, snapshotState } from '../database';

export class StateManager {
  static async loadProject(projectId: string): Promise<CanvasState> {
    const state = await loadState();
    return { ...state, activeProjectId: projectId };
  }

  static async switchProject(projectId: string): Promise<void> {
    const state = await loadState();
    const proj = state.projects.find(p => p.id === projectId);
    if (proj) {
      proj.lastOpenedAt = new Date().toISOString();
      await snapshotState({ ...state, activeProjectId: projectId });
    }
  }
}
