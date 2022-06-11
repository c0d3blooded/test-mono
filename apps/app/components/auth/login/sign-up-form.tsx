import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaApple, FaEnvelope, FaLock } from 'react-icons/fa';
import { useUser } from '../../../hooks/useUser';
import { supabase } from '../../../lib/supabase-client';
import { validateEmail } from '../../../utils/form';
import Button from '../../common/button';
import Input from '../../common/input';
import Notification from '../../common/notification';
import { renderSocialLoginButton } from './helpers';

interface Props {
  onGoToSignIn: () => void; // navigate to the sign in page
}

/**
 * @returns The form for signing up
 */
const SignUpForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const { 'sign-up': signUp } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues
  } = useForm<{ email: string; password: string; passwordConfirmed: string }>();
  const [isLoading, setIsLoading] = useState(false); // indicates that the page is loading or the user is in a logging in state
  const [apiError, setApiError] = useState<string | null>(''); // indicates a login error
  // modal states
  const { error: errorSignIn } = useUser();
  /* Removes all errors from the form */
  const clearAllErrors = () => {
    setApiError(null);
    clearErrors();
  };
  const { email, password } = getValues();
  /* Allow the user to sign up with an email and password */
  const signUpWithEmail = async () => {
    setApiError('');
    if (isLoading) return;
    clearAllErrors();
    // check if password is provided
    if (!password) {
      setError('password', {
        type: 'manual',
        message: 'Please enter a password'
      });
      return;
    }
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp(
        { email, password },
        { redirectTo: window.location.origin }
      );
      if (error) throw error;
    } catch (error: any) {
      setApiError(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /* Sign up with a Google login */
  const loginWithGoogle = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google'
      },
      { redirectTo: window.location.origin }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };
  /* Sign up with a Facebook login */
  const loginWithFacebook = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'facebook'
      },
      { redirectTo: window.location.origin }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };
  /* Sign up with an Apple login */
  const loginWithApple = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'apple'
      },
      { redirectTo: window.location.origin }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src="/images/treelof-icon.svg"
          alt="icon"
          width={75}
          height={75}
        />
        <h2 className="mt-7 text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign up with</p>

            <div className="mt-1 grid grid-cols-3 gap-3">
              {/* sign up with google */}
              {renderSocialLoginButton(
                <Image
                  src="/images/google.svg"
                  width="20"
                  height="20"
                  alt="google-logo"
                />,
                'Sign up with Google',
                loginWithGoogle
              )}
              {/* sign up with facebook */}
              {renderSocialLoginButton(
                <Image
                  src="/images/facebook.svg"
                  width="20"
                  height="20"
                  alt="facebook-logo"
                />,
                'Sign up with Facebook',
                loginWithFacebook
              )}
              {/* sign up with apple */}
              {renderSocialLoginButton(
                <FaApple className="text-xl" />,
                'Sign up with Apple',
                loginWithApple
              )}
            </div>
          </div>

          <div className="flex flex-row mt-6 items-center">
            {/* line left */}
            <div className="w-1/4 border-t border-gray-300" />
            <div className="relative flex flex-1 justify-center text-sm">
              <span className="px-2 text-gray-500">Or continue with</span>
            </div>
            {/* line right */}
            <div className="w-1/4 border-t border-gray-300" />
          </div>
        </div>

        <div className="mt-6">
          <form className="space-y-6" onSubmit={handleSubmit(signUpWithEmail)}>
            {/* notification of an api error */}
            {(apiError || errorSignIn) && (
              <Notification type="error">
                {errorSignIn || apiError}
              </Notification>
            )}
            {/* email input */}
            <Input
              label="Email Address"
              inputProps={{
                type: 'email',
                autoComplete: 'email',
                ...register('email', {
                  required: 'Please enter your email address',
                  validate: {
                    isEmail: validateEmail
                  }
                })
              }}
              error={errors.email?.message}
            />
            {/* password input */}
            <Input
              label="Password"
              inputProps={{
                type: 'password',
                autoComplete: 'current-password',
                ...register('password')
              }}
              error={errors.password?.message}
            />
            {/* valid password input */}
            <Input
              label="Confirm Password"
              inputProps={{
                type: 'password',
                autoComplete: 'current-password',
                ...register('passwordConfirmed', {
                  validate: {
                    // check if the passwords match, don't do validation if no password entered
                    passwordsMatch: (value) =>
                      password && value !== password
                        ? "Your passwords don't match"
                        : true
                  }
                })
              }}
              error={errors.passwordConfirmed?.message}
            />
            <div>
              <Button
                startIcon={<FaEnvelope />}
                buttonProps={{
                  type: 'submit'
                }}
                fullWidth
              >
                Sign Up with Email
              </Button>
              {!signUp && (
                <div className="pt-3">
                  <Button
                    color="secondary"
                    startIcon={<FaLock />}
                    buttonProps={{ onClick: props.onGoToSignIn }}
                    fullWidth
                  >
                    Go to Sign In
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
