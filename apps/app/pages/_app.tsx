import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../hooks/useUser';
import Sidebar from '../components/dashboard/sidebar';
import Fade from '../components/animation/fade';
import Header from '../components/dashboard/header';
import { useState } from 'react';
import cn from 'classnames';
import { AppInformationProvider } from '../hooks/useAppInformation';

function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <UserContextProvider>
      {({ loggedIn, loading }) => {
        const className = cn({
          // styling for the dashboard content
          'p-4 sm:p-6 lg:p-8': loggedIn
        });
        return (
          <AppInformationProvider>
            <Fade show={!loading}>
              <div className="min-h-screen w-screen flex">
                <Sidebar
                  showMobile={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
                {/* content */}
                <div className="w-full flex-1 flex flex-col">
                  {/* dashboard header */}
                  {loggedIn && (
                    <Header onOpenSidebar={() => setSidebarOpen(true)} />
                  )}
                  <div className={className}>
                    <Component {...pageProps} />
                  </div>
                </div>
              </div>
            </Fade>
          </AppInformationProvider>
        );
      }}
    </UserContextProvider>
  );
}

export default App;
