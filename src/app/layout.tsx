import { Montserrat, Roboto, Rubik } from 'next/font/google';
import '@app/_styles/global.css';
import classNames from 'classnames';
import { AppProvider } from '@app/_providers/app-provider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--montserrat-font',
});
const rubik = Rubik({ subsets: ['latin'], variable: '--rubik-font' });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--roboto-font',
  display: 'swap',
});

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ru">
      <body
        className={classNames(
          montserrat.variable,
          rubik.variable,
          roboto.variable,
          'h-screen flex flex-col justify-center',
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
