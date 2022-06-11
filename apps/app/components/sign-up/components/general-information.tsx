import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../common/button';
import Card from '../../common/card';
import SettingsProfile from '../../settings/profile';
import { useUser } from '../../../hooks/useUser';
import { Profile } from '@treelof/models';
import { updateProfile } from '../../../services/profile';
import { SignUpContext } from '../context';

/**
 * @returns the general information section of the sign up form
 */
const SignUpGeneralInformation = () => {
  const { profile } = useUser();
  const [saving, setSaving] = useState(false); // saving form
  const [savingDraft, setSavingDraft] = useState(false); // saving draft of form
  const { onNextStep, onFormStateValidated } = useContext(SignUpContext);
  const methods = useForm<{
    profile: Profile;
  }>({
    // default form values
    defaultValues: {
      profile: profile ?? {}
    }
  });
  const { formState, getValues, handleSubmit } = methods;
  const { isValid } = formState;
  // callback for form state
  useEffect(() => {
    onFormStateValidated(0, isValid);
  }, [isValid, onFormStateValidated]);

  /* Save the form and continue */
  const onSubmit = async () => {
    setSaving(true);
    const { profile } = getValues();
    // save profile information
    const { error } = await updateProfile(profile);
    setSaving(false);
    if (error) {
      console.error(error);
      return;
    }
    // continue to next step
    onNextStep();
  };

  /* Save the form as a draft */
  const onSaveDraft = async () => {
    setSavingDraft(true);
    const { profile } = getValues();
    // save profile information
    await updateProfile(profile);
    setSavingDraft(true);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {/* resuable settings screen */}
          <SettingsProfile />
          <div className="flex justify-end mt-8">
            {/* save the form as a draft */}
            <Button
              buttonProps={{
                type: 'button',
                onClick: onSaveDraft
              }}
              loading={savingDraft}
              outlined
            >
              Save Draft
            </Button>
            {/* complete form */}
            <Button
              buttonProps={{ type: 'submit', className: 'ml-3' }}
              loading={saving}
            >
              Continue
            </Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
};

export default SignUpGeneralInformation;
