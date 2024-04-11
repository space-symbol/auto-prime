import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { useAppSession } from './use-app-session';

export const useRole = () => {
  const session = useAppSession();
  return session?.data?.user?.role;
};

export function AppSessionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
