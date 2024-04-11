'use client';
import { usePathname, useRouter } from 'next/navigation';

const useUpdateParams = () => {
  const router = useRouter();
  const pathname = usePathname()!;

  return (params: Record<string, string>) => {
    const newParams = new URLSearchParams(pathname);
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(pathname + '?' + newParams.toString());
  };
};

export default useUpdateParams;
