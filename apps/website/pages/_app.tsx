import '../styles/globals.css';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'theme-ui';
import type { Theme } from 'theme-ui';
import { tailwind } from '@theme-ui/presets';
import { UserContextProvider } from '@treelof/hooks';

import { CharcteristicContextProvider } from '../context/characteristic';

const theme: Theme = {
  ...tailwind
};
// set axios defaults
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_PAGE}/v1`;

function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      {/* track the characteristics */}
      <ThemeProvider theme={theme}>
        <CharcteristicContextProvider>
          <Component {...pageProps} />
        </CharcteristicContextProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
