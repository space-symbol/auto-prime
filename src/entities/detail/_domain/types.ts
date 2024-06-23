import { z } from 'zod';
import {
  orderBySchema,
  sortSchema,
  searchDetailsParamsSchema,
  detailSchema,
  detailEntityWithDiscountsScema,
} from './schemas';

export type OrederBy = z.infer<typeof orderBySchema>;
export type Sort = z.infer<typeof sortSchema>;
export type SearchDetailsParams = {
  [Key in keyof typeof searchDetailsParamsSchema]?: z.infer<(typeof searchDetailsParamsSchema)[Key]>;
};
export type DetailEntity = z.infer<typeof detailSchema>;
export type DetailEntityWithDiscounts = z.infer<typeof detailEntityWithDiscountsScema>;
