import { z } from 'zod';
import { cartItemWithDetailSchema } from './schemas';

export type CartItemWithDetail = z.infer<typeof cartItemWithDetailSchema>;
