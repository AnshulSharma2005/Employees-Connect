// src/types/index.d.ts

// Make TypeScript aware of environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DATABASE_URL?: string;
    SLACK_CLIENT_ID: string;
    SLACK_CLIENT_SECRET: string;
    SLACK_REDIRECT_URI: string;
    JWT_SECRET: string;
  }
}

// Extend Express Request type to add user object after auth middleware
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}
