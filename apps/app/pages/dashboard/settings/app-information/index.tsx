import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SettingsAppInformation from '../../../../components/dashboard/settings/app-information';
import { useAppInformation, useUser } from '@treelof/hooks';
import { AppInformation, IconData } from '@treelof/models';
import {
  updateProfile,
  uploadAppIcon,
  upsertAppInformation
} from '@treelof/services';
import DashboardSection from '../../../../components/dashboard/dashboard-section';
import { Card } from '@treelof/components';

const SettingsAppInformationPage = () => {
  const { user } = useUser();
  const { appInformation } = useAppInformation();
  const methods = useForm<{
    app_information: AppInformation;
    icon_data: IconData; // the local data for an uploaded icon
  }>();

  useEffect(() => {
    if (appInformation) methods.setValue('app_information', appInformation);
  }, [appInformation, methods]);

  // saves app information data
  const saveAppInformation = async () => {
    const { app_information, icon_data } = methods.getValues();
    const { data } = await upsertAppInformation(app_information);
    if (data?.id) {
      // save app information to profile
      const { id } = data;
      updateProfile({ app_information_id: id }, user?.id);
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
