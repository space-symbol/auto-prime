'use client';
import { AppSessionProvider } from '@/entities/user/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@shared/api/query-client';
import { ThemeProvider } from '@/features/theme-switcher/_ui/theme-provider';

export const AppProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AppSessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppSessionProvider>
  );
};
