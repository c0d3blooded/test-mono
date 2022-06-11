import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiSave } from 'react-icons/hi';
import Button from '../../../components/common/button';
import Card from '../../../components/common/card';
import { Profile } from '@treelof/models';
import {
  createProfile,
  getProfile,
  updateProfile
} from '../../../services/profile';
import { useAppInformation } from '../../../hooks/useAppInformation';
import { getFromSessionStorage, isObjectEmpty } from '../../../utils/common';
import SettingsProfile from '../../../components/settings/profile';
import DashboardSection from '../../../components/common/dashboard-section';

const LeadersEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [saving, setSaving] = useState(false); // saving form
  const { appInformation } = useAppInformation();
  const methods = useForm<{
    profile: Profile;
  }>();
  const { getValues, setValue, handleSubmit } = methods;

  // indicates that this form is creating a new leader
  const isNewLeader = id === 'new';

  useEffect(() => {
    const { profile: leader } = getValues();
    if (!isNewLeader && id && isObjectEmpty(leader)) {
      // check if leader was passed as paramter
      const newLeader = getFromSessionStorage();
      if (isObjectEmpty(newLeader))
        getProfile(`${id}`).then(({ data, error }) => {
          // if there was an error finding the user data, navigate back to profile screen
          if (error) {
            console.error('Could not find user profile');
            router.replace('/leaders');
          }
          // set the form data
          else setValue('profile', data);
        });
      else setValue('profile', newLeader);
    }
  }, [getValues, id, isNewLeader, router, setValue]);

  /* Save the form and continue */
  const onSubmit = async () => {
    // function to compelte the save action
    setSaving(true);
    const { profile } = getValues();
    // save profile information
    if (isNewLeader) {
      const { error } = await createProfile({
        ...profile,
        // attach the profile to this app
        app_information_id: appInformation?.id
      });
      if (error) console.error(error);
      else router.replace('/leaders');
    }
    // existing profile
    else {
      const { error } = await updateProfile(profile);
      if (error) console.error(error);
    }
    setSaving(false);
  };

  return (
    <DashboardSection
      title={`${isNewLeader ? 'Create' : 'Edit'} Leader`}
      description={
        isNewLeader
          ? 'Adds a new leader to your mobile app and sends an invitation to their given email'
          : 'Edit an existing leader in your mobile app'
      }
      // save leader
      action={
        isNewLeader ? (
          <Button
            color="secondary"
            startIcon={<HiSave className="w-4 h-4" />}
            buttonProps={{
              type: 'submit'
            }}
            loading={saving}
          >
            Save new leader
          </Button>
        ) : (
          <div />
        )
      }
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <SettingsProfile />
          </Card>
        </form>
      </FormProvider>
    </DashboardSection>
  );
};

export default LeadersEdit;
