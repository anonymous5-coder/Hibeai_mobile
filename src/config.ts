export const Config = {
  emergent: {
    apiKey: process.env.EXPO_PUBLIC_EMERGENT_KEY || 'dummy_key',
    baseUrl: 'https://api.emergent.com/v1',
    chatEndpoint: '/chat/completions',
    imageEndpoint: '/images/generations',
    timeoutSeconds: 30,
    maxRetries: 3,
    circuitBreakerCooldownMinutes: 5,
  },
  database: {
    canvasDbPath: 'canvas_state.db',
    walEnabled: true,
  },
  ui: {
    theme: 'dark_hacker',
    primaryColor: '#0B0C10',
    accentColor: '#66FCF1',
    codeFont: 'JetBrainsMono',
  },
  cloudOrchestrator: {
    baseUrl: process.env.EXPO_PUBLIC_CLOUD_ORCHESTRATOR_URL || 'https://mock.cloud',
    apiKey: process.env.EXPO_PUBLIC_CLOUD_ORCHESTRATOR_KEY || 'mock',
    pollIntervalSeconds: 10,
  },
  cloudBuilder: {
    baseUrl: process.env.EXPO_PUBLIC_CLOUD_BUILDER_URL || 'https://mock.build',
    apiKey: process.env.EXPO_PUBLIC_CLOUD_BUILDER_KEY || 'mock',
    pollIntervalSeconds: 10,
  }
};
