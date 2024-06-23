import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string().email({
    message: 'Неверный адрес электронной почты',
  }),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const cartItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
});
