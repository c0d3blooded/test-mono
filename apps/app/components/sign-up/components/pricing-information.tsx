import React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { loadStripe } from '@stripe/stripe-js';
import { redirectToCheckout } from '../../../services/api';
import Button from '../../common/button';
import Card from '../../common/card';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
/**
 * @returns the pricing section of the sign up form
 */
const SignUpPricingInformation = () => {
  /* Continue to the payment screen */
  const onContinue = async () => {
    await redirectToCheckout();
  };

  /**
   * @param label the feature label
   * @returns {JSX.Element} a feature for the "what's included" list
   */
  const renderFeature = (label: string) => {
    return (
      <li className="flex items-start lg:col-span-1">
        <div className="flex-shrink-0">
          {/* Heroicon name: solid/check-circle */}
          <HiCheckCircle className="h-5 w-5 text-green-400" />
        </div>
        <p className="ml-3 text-sm text-gray-700">{label}</p>
      </li>
    );
  };

  return (
    <Card noPadding hideOverflow>
      <div className="bg-green-800">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Simple no-tricks pricing
              </h2>
              <p className="mt-4 text-xl text-transparent-white-80">
                If you&apos;re not satisfied, contact us within the first 14
                days and we&apos;ll send you a full refund.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-green-800"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Lifetime Membership
                  </h3>
                  <p className="mt-6 text-base text-gray-500">
                    Lorem ipsum dolor sit amet consect etur adipisicing elit.
                    Itaque amet indis perferendis blanditiis repellendus etur
                    quidem assumenda.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                        What&apos;s included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200"></div>
                    </div>
                    <ul
                      role="list"
                      className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                    >
                      {renderFeature('Private forum access')}
                      {renderFeature('Member resources')}
                      {renderFeature('Entry to annual conference')}
                      {renderFeature('Official member t-shirt')}
                    </ul>
                  </div>
                </div>
                {/* payment section */}
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Pay once, own it forever
                  </p>
                  {/* monthly pricing */}
                  <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                    <span> $9 </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-center text-2xl font-extrabold text-gray-600">
                    <span> or $99 </span>
                    <span className="ml-1 text-lg font-medium text-gray-500">
                      /year
                    </span>
                  </div>
                  <div className="mt-6">
                    <Button
                      buttonProps={{
                        className: 'h-14',
                        onClick: onContinue
                      }}
                      fullWidth
                    >
                      <span className="text-base">Checkout</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignUpPricingInformation;
