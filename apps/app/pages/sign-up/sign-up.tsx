import React, { useCallback, useEffect, useState } from 'react';
import remove from 'lodash.remove';
import { Fade } from '@treelof/animations';
import Authenticator from '../../components/auth/authenticator';
import SignUpAdditionalInformation from '../../components/sign-up/components/additional-information';
import SignUpPricingInformation from '../../components/sign-up/components/pricing-information';
import StepsIndicator from '../../components/common/steps-indicator';
import { SignUpContext } from '../../components/sign-up/context';
import {
  isGeneralInformationComplete,
  isMobileAppInformationComplete
} from '../../utils/form';
import { useUser } from '../../hooks/useUser';
import { getAppInformation } from '../../services/app-information';
import { AppInformation } from '../../models/app-information';
import SignUpGeneralInformation from '../../components/sign-up/components/general-information';
import SignUpMobileAppInformation from '../../components/sign-up/components/mobile-app-information';

const SignUp = () => {
  const { profile } = useUser();
  const [appInformation, setAppInformation] = useState<AppInformation>();
  /**
   * @returns the steps considered complete when the page loads
   */
  const getCompletedSteps = useCallback(() => {
    const completedSteps: Array<number> = [];
    // if the first form is valid
    if (isGeneralInformationComplete(profile)) {
      completedSteps.push(0);
      // if the app information is complete
      if (isMobileAppInformationComplete(appInformation))
        completedSteps.push(1);
    }
    return completedSteps;
  }, [profile, appInformation]);
  const [step, setStep] = useState(getCompletedSteps().length); // the current step of the form
  const [completedSteps, setCompletedSteps] = useState<Array<number>>(
    getCompletedSteps()
  ); // the steps completed

  // load app information data
  useEffect(() => {
    const _ = async () => {
      try {
        if (profile?.uuid) {
          const { data: appInformation } = await getAppInformation(
            profile.uuid
          );
          if (appInformation) setAppInformation(appInformation);
        }
      } catch (error) {
        console.error(error);
      }
    };
    _();
  }, [profile]);

  useEffect(() => {
    const completedSteps = getCompletedSteps();
    setCompletedSteps(completedSteps);
    if (completedSteps.length > 0) setStep(completedSteps.length);
  }, [profile, getCompletedSteps]);

  /**
   *
   * @param step the step
   * @param isComplete if the step is complete
   */
  const onFormStateValidated = (step: number, isComplete: boolean) => {
    if (isComplete && !completedSteps.includes(step)) completedSteps.push(step);
    else if (!isComplete && completedSteps.includes(step))
      remove(completedSteps, step);
    setCompletedSteps(completedSteps);
  };

  return (
    <Authenticator>
      <SignUpContext.Provider
        value={{
          step,
          setStep,
          onNextStep: () => setStep(step + 1),
          onFormStateValidated
        }}
      >
        <div className="bg-gray-100 p-4 min-h-screen">
          <div className="flex flex-col md:flex-row">
            <div className="mx-5">
              <StepsIndicator
                steps={[
                  {
                    label: 'General Information',
                    description:
                      'Details about yourself and your business or municipality'
                  },
                  {
                    label: 'Mobile App Information',
                    description:
                      'Provide customizations for your mobile app. You can always update these settings later'
                  },
                  {
                    label: 'Additional Information',
                    description:
                      "Let's complete your profile with some additonal information"
                  },
                  {
                    label: 'Pricing',
                    description: 'Complete information about our service'
                  }
                ]}
                activeStep={step}
                completedSteps={completedSteps}
                onChange={(step) => setStep(step)}
              />
            </div>
            <div className="flex-1 space-y-6">
              {/* general information section */}
              <Fade show={step === 0} withDelay={step === 0}>
                <SignUpGeneralInformation />
              </Fade>
              {/* mobile app information section */}
              <Fade show={step === 1} withDelay={step === 1}>
                <SignUpMobileAppInformation initialData={appInformation} />
              </Fade>
              {/* section to gather additional information */}
              <Fade show={step === 2} withDelay={step === 2}>
                <SignUpAdditionalInformation />
              </Fade>
              {/* section to display pricing information*/}
              <Fade show={step === 3} withDelay={step === 3}>
                <SignUpPricingInformation />
              </Fade>
            </div>
          </div>
        </div>
      </SignUpContext.Provider>
    </Authenticator>
  );
};

export default SignUp;
