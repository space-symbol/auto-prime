import { Montserrat, Roboto, Rubik } from 'next/font/google';
import localFont from 'next/font/local';
import '@app/_styles/global.css';
import { AppProvider } from '@app/_providers/app-provider';
import { Metadata } from 'next';
import { APP_NAME } from '@/shared/config/seo';
import { Toaster } from '@/shared/ui/toaster';
import '@/shared/lib/toDateTimeLocalString';
import { cn } from '@/shared/lib/utils';
const golos = localFont({
  src: './golos.woff2',
  variable: '--golos-font',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--montserrat-font',
  display: 'swap',
});
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--rubik-font',
  display: 'swap',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--roboto-font',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Премиальный магазин автозапчастей в Москве и Московской области',
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="ru"
      className="dark"
      suppressHydrationWarning>
      <body
        className={cn(
          montserrat.variable,
          rubik.variable,
          roboto.variable,
          golos.variable,
          'h-screen flex flex-col justify-center',
        )}>
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
