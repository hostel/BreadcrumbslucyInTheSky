import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { Header } from 'components/header';

import { StoreProvider } from './storeProvider';

export const metadata = {
  title: 'LUCY IN THE SKY | Designed in Los Angeles',
};

import 'normalize.css';
import 'styles/base.scss';
import 'styles/variables.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
