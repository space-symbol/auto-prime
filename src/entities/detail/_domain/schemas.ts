import { z } from 'zod';
export const DetailBaseScema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number().default(0),
  priceAfterDiscount: z.number(),
  discountEndDate: z.date().nullable(),
  quantityAvailable: z.number(),
  images: z.string().array(),
});

export const DetailEntityScema = DetailBaseScema.extend({
  id: z.number(),
});

export const OrderBySchema = z.enum(['quantityOrdered', 'name', 'price', 'discountPercentage']);
export const SortSchema = z.enum(['asc', 'desc']);

export const SearchDetailsParamsSchema = {
  orderBy: OrderBySchema.optional(),
  sort: SortSchema.optional(),
  search: z.string().optional(),
  novelty: z.boolean().optional(),
  promoted: z.boolean().optional(),
  popular: z.boolean().optional(),
  limit: z.number().optional(),
};
