import React, { useEffect } from 'react';
import { Fade } from '@treelof/animations';
import { useUser } from '@treelof/hooks';
import { Loader } from '@treelof/components';

interface Props {
  children?: React.ReactNode;
}
/**
 * @returns a higher order component which sends the user to the
 * login screen if they are not authenticated
 */
const Authenticator: React.FC<Props> = (props) => {
  const { session, profile, loading } = useUser();
  // the user is logged in
  const isLoggedIn = Boolean(session) && Boolean(profile);
  useEffect(() => {
    // if session isn't loading, go to login page
    if (!loading && !isLoggedIn)
      window.location.href = `${process.env.NEXT_PUBLIC_HOME_PAGE}/login`;
  }, [isLoggedIn, loading]);

  return (
    <>
      {/* render a loading screen while authentication is being checked */}
      <Fade show={!loading}>
        <>{props.children}</>
      </Fade>
      {/* loading icon */}
      {loading && (
        <div className="flex items-center justify-center h-full">
          <Loader color="green" size={9} />
        </div>
      )}
    </>
  );
};

export default Authenticator;
