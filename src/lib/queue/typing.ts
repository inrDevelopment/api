export enum TaskPriority {
  ALTA,
  MÉDIA,
  BAIXA
}

export enum TaskStatus {
  PENDING,
  PROCESSING,
  DONE,
  FAILED
}

export type taskDeclaration = {
  priority?: number
  maxRetries?: number
  rateLimit?: number
  handle: (payload?: any) => Promise<void>
}

export type taskControl = {
  id: number
  name: string
  priority: number
  retries: number
  maxRetries: number
  status: TaskStatus
  rateLimit: number
  createdAt: Date
}
