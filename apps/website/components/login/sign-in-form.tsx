import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaApple, FaEnvelope, FaLock } from 'react-icons/fa';
import { renderSocialLoginButton } from './helpers';
import { useUser } from '@treelof/hooks';
import { supabase } from '@treelof/services';
import {
  AlertModal,
  Button,
  Input,
  Notification,
  TreelofIcon
} from '@treelof/components';
import { validateEmail } from '@treelof/utils';
import { useRouter } from 'next/router';

interface Props {
  onGoToSignUp: () => void; // navigate to the sign up page
}
/**
 * @returns The form for logging in
 */
const SignInForm: React.FC<Props> = (props) => {
  const router = useRouter();
  // the item to redirect back to
  const { redirect } = router.query;
  const redirectTo = (redirect ??
    process.env.NEXT_PUBLIC_APP_PAGE ??
    '') as string;

  console.log(redirectTo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues
  } = useForm<{ email: string; password: string }>();
  const [isLoading, setIsLoading] = useState(false); // indicates that the page is loading or the user is in a logging in state
  const [apiError, setApiError] = useState<string | null>(''); // indicates a login error
  // modal states
  const [loginAttempts, setLoginAttempts] = useState(0); // the number of login attemps made
  const [showMagicLinkDialog, setShowMagicLinkDialog] = useState(false); // show the success dialog for magic link
  const [showMagicLinkOption, setShowMagicLinkOption] = useState(false); // toggles the email link option based on login attemps
  const { error: errorSignIn } = useUser();

  console.log('redirectTo', redirectTo);
  /**
   * Removes all errors from the form
   */
  const clearAllErrors = () => {
    setApiError(null);
    clearErrors();
  };
  /* Allow the user to sign in with an email and password */
  const loginWithEmail = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { email, password } = getValues();
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
      const { error } = await supabase.auth.signIn(
        { email, password },
        { redirectTo }
      );
      if (error) throw error;
    } catch (error: any) {
      setApiError(error.error_description || error.message);
      setLoginAttempts(loginAttempts + 1);
      if (loginAttempts === 3) setShowMagicLinkOption(true);
    } finally {
      setIsLoading(false);
    }
  };
  /* Allow the user to sign in with a magic link */
  const loginWithMagicLink = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { email } = getValues();
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({ email }, { redirectTo });
      if (error) throw error;
      setShowMagicLinkOption(false);
      setShowMagicLinkDialog(true);
    } catch (error: any) {
      setApiError(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  /* Sign in with a Google login */
  const loginWithGoogle = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google'
      },
      { redirectTo }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };
  /* Sign in with a Facebook login */
  const loginWithFacebook = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'facebook'
      },
      { redirectTo }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };
  /* Sign in with an Apple login */
  const loginWithApple = async () => {
    if (isLoading) return;
    clearAllErrors();
    const { error } = await supabase.auth.signIn(
      {
        provider: 'apple'
      },
      { redirectTo }
    );
    if (error) {
      setApiError(error.message);
      return;
    }
  };

  return (
    <>
      {/* success dialog for magic link */}
      <AlertModal
        title="Magic Link Sent"
        description={`Check your email ${
          getValues().email
        } for the login link!`}
        visible={showMagicLinkDialog}
        onClose={() => setShowMagicLinkDialog(false)}
      />
      <div className="flex flex-col items-center">
        {/* icon */}
        <TreelofIcon width={75} height={75} />
        <h2 className="mt-7 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8">
        <div>
          <div>
            <p className="text-sm font-medium text-gray-700">Sign in with</p>

            <div className="mt-1 grid grid-cols-3 gap-3">
              {/* login with google */}
              {renderSocialLoginButton(
                <Image
                  src="/images/social/google.svg"
                  width="20"
                  height="20"
                  alt="google-logo"
                />,
                'Sign in with Google',
                loginWithGoogle
              )}
              {/* login with facebook */}
              {renderSocialLoginButton(
                <Image
                  src="/images/social/facebook.svg"
                  width="20"
                  height="20"
                  alt="facebook-logo"
                />,
                'Sign in with Facebook',
                loginWithFacebook
              )}
              {/* login with apple */}
              {renderSocialLoginButton(
                <FaApple className="text-xl" />,
                'Sign in with Apple',
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
          <form className="space-y-6" onSubmit={handleSubmit(loginWithEmail)}>
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
            {/* login with magic link */}
            {showMagicLinkOption && (
              <Notification>
                <div className="flex flex-col items-center">
                  <div>Would you like to use a magic link?</div>
                  <div className="pt-3">
                    <Button
                      startIcon={<FaEnvelope />}
                      buttonProps={{
                        onClick: handleSubmit(loginWithMagicLink)
                      }}
                      fullWidth
                    >
                      Send Me a Link
                    </Button>
                  </div>
                </div>
              </Notification>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <Button
                startIcon={<FaLock />}
                buttonProps={{ type: 'submit' }}
                fullWidth
              >
                Sign In with Email
              </Button>
              <div className="pt-3">
                <Button
                  color="secondary"
                  startIcon={<FaEnvelope />}
                  buttonProps={{
                    onClick: props.onGoToSignUp
                  }}
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
