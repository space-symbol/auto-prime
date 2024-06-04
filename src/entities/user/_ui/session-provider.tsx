import { SessionProvider as NextAuthProvider } from 'next-auth/react';

export function AppSessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
