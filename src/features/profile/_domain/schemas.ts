import { z } from 'zod';

export const updateProfileSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  image: z.custom<FormData>().optional(),
});
