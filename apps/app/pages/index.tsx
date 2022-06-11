import { Session } from '@supabase/supabase-js';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaAndroid, FaAppStore, FaApple, FaGooglePlay } from 'react-icons/fa';
import { HiCog, HiOutlineUsers } from 'react-icons/hi';
import Fade from '../components/animation/fade';
import Button from '../components/common/button';
import DashboardSection from '../components/common/dashboard-section';
import CheckoutSuccess from '../components/dashboard/components/checkout-success';
import { useUser } from '../hooks/useUser';
import { supabase } from '../lib/supabase-client';
import { deleteStripeSession } from '../services/api';
import { acceptInvitation } from '../services/invitation';

const Home: NextPage = () => {
  const router = useRouter();
  const { loggedIn, refreshProfiles, signOut } = useUser();
  // text to show a successful response
  const [successText, setSuccessText] = useState<string>();
  const query = new URLSearchParams(window.location.search);
  // coming in from a stripe payment
  const [showSuccessModal, setShowSuccessModal] = useState(
    Boolean(query.get('payment-successful'))
  );
  // successful login after an invitation code
  const invitationCode = query.get('code');
  // sign out the user if the come in with an invitation code
  useEffect(() => {
    if (invitationCode) {
      // save session item in storage
      sessionStorage.setItem('code', invitationCode);
      // sign out if there is an invitation code
      signOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationCode]);

  useEffect(() => {
    const invitationCode = sessionStorage.getItem('code');
    // when the authentication state changes, accept the invitaiton and refresh the profiles
    if (invitationCode && !loggedIn) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_, session: Session | null) => {
          if (session && session?.user) {
            // accept invitation
            await acceptInvitation({ invitation_code: invitationCode });
            // once the user signs in
            refreshProfiles(session?.user?.id);
            sessionStorage.removeItem('code');
            authListener?.unsubscribe();
            setSuccessText(
              "Success! You've accepted your invitation. Welcome aboard 🚀!"
            );
            // remove any query parameters
            router.replace('/');
          }
        }
      );
      // unsubscribe from auth state
      return () => authListener?.unsubscribe();
    }
  });

  // expire the stripe session
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const stripeSessionId = query.get('session_id');
    if (stripeSessionId) deleteStripeSession(stripeSessionId);
  }, []);

  const _renderStatusCard = (
    title: string,
    description: string,
    icon: JSX.Element,
    extra?: string,
    action?: JSX.Element
  ) => {
    return (
      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
        <dt>
          <div className="absolute bg-secondary-400 text-white text-2xl rounded-md p-3">
            {icon}
          </div>
          {/* title */}
          <p className="ml-16 text-sm font-medium text-gray-500 truncate">
            {title}
          </p>
        </dt>
        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
          {/* description */}
          <p className="text-2xl font-semibold text-gray-900">{description}</p>
          {/* extra text */}
          <p className="ml-2 flex items-baseline text-sm font-semibold text-primary-600">
            {extra}
          </p>
          {action && (
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              {action}
            </div>
          )}
        </dd>
      </div>
    );
  };

  return (
    <DashboardSection
      title="Dashboard"
      description="Your hub for metrics and features"
      action={
        <Button
          color="secondary"
          startIcon={<HiCog className="w-4 h-4" />}
          buttonProps={{
            // add a new leader
            onClick: () => router.push('/settings')
          }}
        >
          Settings
        </Button>
      }
      successText={successText}
    >
      {/* header */}
      <Head>
        <title>Dashboard - Treelof</title>
      </Head>
      {/* stripe success modal */}
      <Fade show={showSuccessModal}>
        <CheckoutSuccess onClose={() => setShowSuccessModal(false)} />
      </Fade>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          App Status
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* ios card */}
          {_renderStatusCard(
            'iOS',
            'Pending',
            <FaApple />,
            'v1.0',
            <a
              href="https://www.apple.com/app-store"
              className="flex flex-row items-center justify-between text-secondary-600 hover:text-secondary-500 cursor-pointer"
            >
              <span className="text-sm font-medium">
                View on the App Store
                <span className="sr-only">View on the App Store</span>
              </span>
              <FaAppStore />
            </a>
          )}
          {/* google play card */}
          {_renderStatusCard(
            'Android',
            'Pending',
            <FaAndroid />,
            'v1.0',
            <a
              href="https://play.google.com/store?hl=en_US&gl=US"
              className="flex flex-row items-center justify-between text-secondary-600 hover:text-secondary-500"
            >
              <span className="text-sm font-medium">
                View on the Play Store
                <span className="sr-only">View on the Play Store</span>
              </span>
              <FaGooglePlay />
            </a>
          )}
          {/* users card */}
          {_renderStatusCard('Total Users', '100', <HiOutlineUsers />)}
        </dl>
      </div>
    </DashboardSection>
  );
};

export default Home;
