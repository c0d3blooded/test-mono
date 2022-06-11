import {  useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Fade } from '@treelof/animations';
import SignInForm from './sign-in-form';
import SignUpForm from './sign-up-form';
import { useRouter } from 'next/router';

/**
 * @returns The primary login page
 */
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { 'sign-up': signUp } = router.query;
  const isSignUpOnly = Boolean(signUp); // this is a sign up only flow
  const [showSignUp, setShowSignUp] = useState(isSignUpOnly);
  return (
    <>
      {/* header */}
      <Head>
        <title>Treelof - Login</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:w-2/5">
          {/* sign in form */}
          {!isSignUpOnly && (
            <Fade show={!showSignUp} withDelay={!showSignUp}>
              <SignInForm onGoToSignUp={() => setShowSignUp(true)} />
            </Fade>
          )}
          {/* sign up form */}
          <Fade
            show={showSignUp || isSignUpOnly}
            withDelay={!isSignUpOnly && showSignUp}
          >
            <SignUpForm onGoToSignIn={() => setShowSignUp(false)} />
          </Fade>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/login_image.jpg"
            layout="fill"
            alt="login_image"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
