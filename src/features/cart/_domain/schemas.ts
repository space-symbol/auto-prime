import { detailSchema } from '@/entities/detail/_domain/schemas';
import { cartItemSchema } from '@/entities/user/_domain/shemas';

export const cartItemWithDetailSchema = cartItemSchema.extend({
  detail: detailSchema,
});
