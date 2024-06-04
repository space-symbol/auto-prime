import { z } from 'zod';
import { OrderBySchema, SortSchema, SearchDetailsParamsSchema, DetailEntityScema, DetailBaseScema } from './schemas';

export type OrederBy = z.infer<typeof OrderBySchema>;
export type Sort = z.infer<typeof SortSchema>;
export type SearchDetailsParams = {
  [Key in keyof typeof SearchDetailsParamsSchema]?: z.infer<(typeof SearchDetailsParamsSchema)[Key]>;
};
export type DetailEntity = z.infer<typeof DetailEntityScema>;
export type DetailBase = z.infer<typeof DetailBaseScema>;
