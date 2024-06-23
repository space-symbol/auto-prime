import { z } from 'zod';

export const detailSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantityAvailable: z.number(),
  images: z.string().array(),
  discountedPrice: z.number().nullable(),
});

export const detailEntityWithDiscountsScema = detailSchema.extend({
  discounts: z
    .object({
      percentage: z.number(),
      endDate: z.date(),
      startDate: z.date(),
    })
    .array(),
});

export const orderBySchema = z.enum(['quantityOrdered', 'name', 'price', 'discountPercentage']);
export const sortSchema = z.enum(['asc', 'desc']);

export const searchDetailsParamsSchema = {
  orderBy: orderBySchema.optional(),
  sort: sortSchema.optional(),
  search: z.string().optional(),
  novelty: z.boolean().optional(),
  promoted: z.boolean().optional(),
  popular: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
};
