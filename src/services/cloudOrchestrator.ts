import axios from 'axios';
import { Config } from '../config';

export class CloudOrchestrator {
  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Config.cloudOrchestrator.apiKey}`,
    };
  }

  static async fetchStatus() {
    try {
      const res = await axios.get(`${Config.cloudOrchestrator.baseUrl}/api/orchestrator/status`, { headers: this.getHeaders() });
      return res.data;
    } catch (e) {
      throw new Error('Cloud Fetch Error');
    }
  }

  static async getMemory() {
    try {
      const res = await axios.get(`${Config.cloudOrchestrator.baseUrl}/api/orchestrator/memory`, { headers: this.getHeaders() });
      return res.data;
    } catch (e) {
      throw new Error('Cloud Memory Error');
    }
  }
}

export class CloudBuilder {
  private static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Config.cloudBuilder.apiKey}`,
    };
  }

  static async submitAppIdea(prompt: string): Promise<string> {
    const res = await axios.post(`${Config.cloudBuilder.baseUrl}/api/build`, { prompt }, { headers: this.getHeaders() });
    return res.data.build_id;
  }

  static async getBuildStatus(buildId: string): Promise<any> {
    const res = await axios.get(`${Config.cloudBuilder.baseUrl}/api/build/${buildId}/status`, { headers: this.getHeaders() });
    return res.data;
  }

  static async getBuildResult(buildId: string): Promise<any> {
    const res = await axios.get(`${Config.cloudBuilder.baseUrl}/api/build/${buildId}/result`, { headers: this.getHeaders() });
    return res.data;
  }

  static async deployApp(buildId: string): Promise<string> {
    const res = await axios.post(`${Config.cloudBuilder.baseUrl}/api/build/${buildId}/deploy`, {}, { headers: this.getHeaders() });
    return res.data.url;
  }
}
