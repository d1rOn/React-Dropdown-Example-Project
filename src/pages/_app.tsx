import type { AppProps } from 'next/app';

import '../styles/globals.scss';

function DemoApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default DemoApp;
