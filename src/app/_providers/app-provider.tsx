'use client';
import { AppSessionProvider } from '@entities/user/session';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@shared/api/query-client';

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AppSessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppSessionProvider>
  );
};
