import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import isempty from 'lodash.isempty';
import { AppInformation, Profile } from '@treelof/models';
import { upsertAppInformation } from '../../../services/app-information';
import Button from '../../common/button';
import Card from '../../common/card';
import { SignUpContext } from '../context';
import { downloadAppIcon, uploadAppIcon } from '../../../services/storage';
import { dataToBase64 } from '../../../utils/common';
import { IconData } from '../../common/icon-uploader/icon-uploader';
import { supabase } from '../../../lib/supabase-client';
import { table as profile_table } from '../../../services/profile';
import { useUser } from '../../../hooks/useUser';
import SettingsAppInformation from '../../settings/app-information';

interface Props {
  initialData?: AppInformation; // the initial load of app information
}

/**
 * @returns the mobile app information section of the sign up form
 */
const SignUpMobileAppInformation: React.FC<Props> = ({ initialData }) => {
  const { user } = useUser();
  const { onNextStep, onFormStateValidated } = useContext(SignUpContext);
  const [saving, setSaving] = useState(false); // saving the form
  const [savingDraft, setSavingDraft] = useState(false); // saving draft of form
  const methods = useForm<{
    app_information: AppInformation;
    icon_data: IconData; // the local data for an uploaded icon
  }>({
    // default form values
    defaultValues: {
      app_information: {
        primary_color: 'green',
        secondary_color: 'greenAccent',
        ...initialData
      }
    }
  });
  const { formState, getValues, setValue, control, handleSubmit } = methods;
  // watch material colors for changes
  useWatch({
    name: ['app_information.primary_color', 'app_information.secondary_color'],
    control
  });
  const { isValid } = formState;

  // callback for form state
  useEffect(() => {
    onFormStateValidated(1, isValid);
  }, [isValid, onFormStateValidated]);
  // update the form data
  useEffect(() => {
    if (initialData && !isempty(initialData)) {
      setValue('app_information', initialData);
      const { icon_url } = initialData;
      // download the saved icon url if available
      if (icon_url)
        downloadAppIcon(icon_url).then(async ({ data }) => {
          // parse the icon name
          const arr = icon_url.split('/');
          const fileName = arr[arr.length - 1];
          const iconName = fileName.split('.')[0];
          // if data available
          if (data) {
            const text = await data.text();
            const icon = await dataToBase64(text, data.type);
            setValue('icon_data', {
              name: iconName,
              data: icon
            });
          }
        });
    }
  }, [initialData, setValue]);

  // saves app information data
  const saveAppInformation = async () => {
    const { app_information, icon_data } = getValues();
    const { data } = await upsertAppInformation(app_information);
    if (data?.id) {
      // save app information to profile
      const { id } = data;
      supabase
        .from<Profile>(profile_table)
        .update({ app_information_id: id })
        .eq('uuid', user?.id)
        .single();
      // save icon
      if (icon_data) {
        await uploadAppIcon(id, icon_data.data, icon_data.name);
      }
    }
  };

  /* Save the form and continue */
  const onSubmit = async () => {
    setSaving(true);
    await saveAppInformation();
    // continue to next step
    onNextStep();
    setSaving(false);
  };
  /* Save the form as a draft */
  const onSaveDraft = async () => {
    setSavingDraft(true);
    await saveAppInformation();
    setSavingDraft(false);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {/* resuable settings screen */}
          <SettingsAppInformation />
          <div className="flex justify-end mt-8">
            {/* save the form as a draft */}
            <Button
              buttonProps={{ type: 'button', onClick: onSaveDraft }}
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

export default SignUpMobileAppInformation;
