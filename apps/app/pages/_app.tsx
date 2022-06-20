import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Fade } from '@treelof/animations';
import {
  UserContextProvider,
  AppInformationProvider,
  useUser
} from '@treelof/hooks';
import Sidebar from '../components/dashboard/sidebar';
import Header from '../components/dashboard/header';
import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

interface Props {
  children?: React.ReactNode;
}

/**
 * Container for the dashboard portion of the app
 * @returns
 */
const DashboardContainer: React.FC<Props> = ({ children }) => {
  const { loggedIn, loading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const className = cn({
    // styling for the dashboard content
    'p-4 sm:p-6 lg:p-8 flex-1': loggedIn
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
            {loggedIn && <Header onOpenSidebar={() => setSidebarOpen(true)} />}
            {/* dashboard body */}
            <div className={className}>{children}</div>
          </div>
        </div>
      </Fade>
    </AppInformationProvider>
  );
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // renders the container appropriate for the app
  const _renderContainer = () => {
    // show dashboard route
    if (router.asPath.includes('/dashboard'))
      return (
        <DashboardContainer>
          <Component {...pageProps} />
        </DashboardContainer>
      );

    // show the component
    return <Component {...pageProps} />;
  };

  return <UserContextProvider>{_renderContainer()}</UserContextProvider>;
}

export default App;
