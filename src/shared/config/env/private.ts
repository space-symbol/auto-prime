import { z } from 'zod';

const privateConfigSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  DEFAULT_LOGIN_REDIRECT: z.string(),

  ADMIN_EMAILS: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
