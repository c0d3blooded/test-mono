import '../styles/globals.css';
import dynamic from 'next/dynamic';
import axios from 'axios';
import type { AppProps } from 'next/app';

import { CharcteristicContextProvider } from '../context/characteristic';

// set axios defaults
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_PAGE}/v1`;

function App({ Component, pageProps }: AppProps) {
  return (
    // track the characteristics
    <CharcteristicContextProvider>
      <Component {...pageProps} />
    </CharcteristicContextProvider>
  );
}

export default App;
