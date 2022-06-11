import { FormProvider, useForm } from 'react-hook-form';
import Card from '../../../components/common/card';
import DashboardSection from '../../../components/common/dashboard-section';
import SettingsProfile from '../../../components/settings/profile';
import { useUser } from '../../../hooks/useUser';
import { Profile } from '@treelof/models';
import { updateProfile } from '../../../services/profile';

interface FormState {
  profile: Profile;
}
const SettingsProfilePage = () => {
  const { profile } = useUser();
  const methods = useForm<FormState>({
    // default form values
    defaultValues: {
      profile: profile ?? {}
    },
    mode: 'onBlur'
  });
  const handleBlur = async (attributes: FormState) => {
    const { isValid } = methods.formState;
    if (!isValid) return;
    // save profile information
    const { error } = await updateProfile(attributes.profile);
    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <DashboardSection
      title="Profile Settings"
      description="Edit your profile settings such as your name, organization and location"
    >
      {/* reusable settings screen */}
      <FormProvider {...methods}>
        <form className="space-y-6" onBlur={methods.handleSubmit(handleBlur)}>
          <Card>
            <SettingsProfile />
          </Card>
        </form>
      </FormProvider>
    </DashboardSection>
  );
};

export default SettingsProfilePage;
