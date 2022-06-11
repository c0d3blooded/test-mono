import React from 'react';
import { useUser } from '../../../hooks/useUser';
import Fade from '../../animation/fade';
import LoginPage from '../login';

/**
 * @returns a higher order component which sends the user to the
 * login screen if they are not authenticated
 */
const Authenticator: React.FC = (props) => {
  const { session, profile, loading } = useUser();
  // the user is logged in
  const isLoggedIn = Boolean(session) && Boolean(profile);

  return (
    <>
      {/* render a loading screen while authentication is being checked */}
      <Fade show={!loading}>
        {isLoggedIn ? <>{props.children}</> : <LoginPage />}
      </Fade>
    </>
  );
};

export default Authenticator;
