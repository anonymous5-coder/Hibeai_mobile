import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Project, ProjectSchema } from '../models/canvasState';

export class ProjectExport {
  static async exportProject(project: Project) {
    const fileUri = FileSystem.documentDirectory + `${project.id}_export.json`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(project));
    await Sharing.shareAsync(fileUri);
  }

  static async importProject(): Promise<Project | null> {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      try {
        return ProjectSchema.parse(JSON.parse(content));
      } catch (e) {
        console.error("Invalid project file", e);
      }
    }
    return null;
  }
}
