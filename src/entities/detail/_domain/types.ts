import { Detail } from '@prisma/client';

export interface DetailEntity extends Detail {}

export type OrderBy = 'name' | 'price' | 'discount' | 'amount';
export type Sort = 'asc' | 'desc';

export interface SearchOptions {
  searchValue: string;
  order: string;
  sort: string;
}
