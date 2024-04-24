import { Montserrat, Roboto, Rubik } from 'next/font/google';
import localFont from 'next/font/local';
import '@app/_styles/global.css';
import classNames from 'classnames';
import { AppProvider } from '@app/_providers/app-provider';
import { Metadata } from 'next';
import { APP_NAME } from '@/shared/config/seo';

const golos = localFont({
  src: './golos.woff2',
  variable: '--golos-font',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--montserrat-font',
});
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--rubik-font',
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
    <html lang="ru">
      <body
        className={classNames(
          montserrat.variable,
          rubik.variable,
          roboto.variable,
          golos.variable,
          'h-screen flex flex-col justify-center',
        )}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
