import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.string().datetime(),
  fileAttachmentName: z.string().optional(),
  imageAttachment: z.string().optional(),
});

export const ImageEntrySchema = z.object({
  prompt: z.string(),
  imageUrl: z.string(),
  createdAt: z.string().datetime(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  lastOpenedAt: z.string().datetime(),
  history: z.array(ChatMessageSchema),
  imageHistory: z.array(ImageEntrySchema),
});

export const CanvasStateSchema = z.object({
  userIntent: z.string().default(''),
  systemPrompts: z.record(z.string()).default({}),
  projects: z.array(ProjectSchema).default([]),
  activeProjectId: z.string().uuid().optional(),
  localHistory: z.array(ChatMessageSchema).optional(),
  imagePromptHistory: z.array(ImageEntrySchema).optional(),
  orchestratorStatus: z.enum(['idle', 'working', 'error']).default('idle'),
  trustScore: z.number().int().min(0).max(1000).default(1000),
  errorBudget: z.number().int().min(0).max(3).default(3),
  isCircuitBreakerActive: z.boolean().default(false),
  circuitBreakerUntil: z.string().datetime().nullable().default(null),
  dailyTokenUsage: z.number().int().default(0),
  circadianDeepSleep: z.boolean().default(false),
  recentErrorHashes: z.array(z.string()).default([]),
  isLocalInferenceActive: z.boolean().default(false),
  cloudOrchestratorData: z.object({
    current_phase: z.string().optional(),
    phase_description: z.string().optional(),
    mcts_plans: z.array(z.any()).optional(),
    task_queue: z.array(z.any()).optional(),
    compressed_context: z.record(z.string()).optional(),
  }).optional().default({}),
  isCloudConnected: z.boolean().default(false),
  builderState: z.object({
    activeBuildId: z.string().nullable().default(null),
    buildStatus: z.object({
      phase: z.string(),
      agents: z.array(z.object({
        name: z.string(),
        status: z.enum(['idle', 'working', 'done', 'error']),
        log: z.string(),
      })),
    }).nullable().default(null),
    deployedApps: z.array(z.object({
      buildId: z.string(),
      name: z.string(),
      url: z.string(),
      createdAt: z.string().datetime(),
    })).default([]),
  }).default({}),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ImageEntry = z.infer<typeof ImageEntrySchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type CanvasState = z.infer<typeof CanvasStateSchema>;
