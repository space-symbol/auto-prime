'use client';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';

export function useGetQueryParams<P extends Record<string, z.ZodType<any, any, any>>>(params: P) {
  const searchParams = useSearchParams();
  const res: { [K in keyof P]?: z.infer<P[K]> } = {};

  for (const key in params) {
    const paramKey = key as keyof P;
    const paramSchema = params[paramKey];
    const r = paramSchema.safeParse(searchParams.get(paramKey.toString()));
    if (r.success) {
      res[paramKey] = r.data;
    }
  }
  return res;
}
