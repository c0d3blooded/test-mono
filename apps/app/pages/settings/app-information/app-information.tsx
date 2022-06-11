import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Card from '../../../components/common/card';
import DashboardSection from '../../../components/common/dashboard-section';
import { IconData } from '../../../components/common/icon-uploader/icon-uploader';
import SettingsAppInformation from '../../../components/settings/app-information';
import { useAppInformation } from '../../../hooks/useAppInformation';
import { useUser } from '../../../hooks/useUser';
import { supabase } from '../../../lib/supabase-client';
import { AppInformation, Profile } from '@treelof/models';
import { upsertAppInformation } from '../../../services/app-information';
import { table as profile_table } from '../../../services/profile';
import { uploadAppIcon } from '../../../services/storage';

const SettingsAppInformationPage = () => {
  const { user } = useUser();
  const { appInformation } = useAppInformation();
  const methods = useForm<{
    app_information: AppInformation;
    icon_data: IconData; // the local data for an uploaded icon
  }>();

  useEffect(() => {
    console.log('appInformation', appInformation);
    if (appInformation) methods.setValue('app_information', appInformation);
  }, [appInformation, methods]);

  // saves app information data
  const saveAppInformation = async () => {
    const { app_information, icon_data } = methods.getValues();
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
    await saveAppInformation();
  };
  return (
    <DashboardSection
      title="App Information Settings"
      description="Change your app's settings such as the name, description and colors"
    >
      {/* reusable settings screen */}
      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <Card>
            <SettingsAppInformation />
          </Card>
        </form>
      </FormProvider>
    </DashboardSection>
  );
};

export default SettingsAppInformationPage;
