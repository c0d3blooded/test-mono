import { HiPlus } from 'react-icons/hi';
import Button from '../../components/common/button';
import { getName } from '../../utils/profile';
import { useRouter } from 'next/router';
import { Fade } from '@treelof/animations';
import { useIsMobile } from '@treelof/hooks';
import { Profile, ProfileRoles } from '@treelof/models';
import { useUser } from '../../hooks/useUser';
import { useAppInformation } from '../../hooks/useAppInformation';
import cn from 'classnames';
import ConfirmationModal from '../../components/common/modals/confirmation-modal';
import { useEffect, useState } from 'react';
import {
  getProfilesByApp,
  linkUserToProfile,
  table as profile_table
} from '../../services/profile';
import { supabase } from '../../lib/supabase-client';
import { copyObject, passThroughSessionStorage } from '../../utils/common';
import { sendInvitation } from '../../services/invitation';
import DashboardSection from '../../components/common/dashboard-section';

/**
 * @returns A table of leaders within the app
 */
const Leaders = () => {
  const router = useRouter();
  const mobile = useIsMobile();
  const { profile, signOut } = useUser();
  const { appInformation } = useAppInformation();
  // profiles
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<Array<Profile>>();
  // thie profile is being sent an invitation
  const [sendingInvitation, setSendingInvitation] = useState<Profile | null>();
  // show/hide modals
  const [linkProfile, setLinkProfile] = useState<Profile>();
  const [showLinkProfileModal, setShowLinkProfileModal] = useState(false);
  // text to show a successful response
  const [successText, setSuccessText] = useState<string>();
  // text to show an error response
  const [errorText, setErrorText] = useState<string>();

  // listen to profile update changes
  useEffect(() => {
    if (appInformation?.id) {
      // get profiles
      if (!profiles)
        getProfilesByApp(appInformation?.id).then(({ data, error }) => {
          if (error != null) {
            switch (error.code) {
              case '401':
                signOut();
                break;
              default:
                setErrorText(error.message);
            }
          }
          if (data != null) setProfiles(data);
          setLoading(false);
        });
      // subscribe to profile updates
      const subscription = supabase
        .from<Profile>(
          `${profile_table}:app_information_id=eq.${appInformation.id}`
        )
        // add profile to list
        .on('INSERT', (payload) =>
          setProfiles([...(profiles ?? []), payload.new])
        )
        .on('UPDATE', (payload) => {
          const newProfile = payload.new as Profile;
          // replaces the value in the old profiles list
          const newProfiles = profiles?.map((p) =>
            p.uuid === newProfile.uuid ? newProfile : p
          );
          setProfiles(copyObject(newProfiles));
        })
        // remove profile from list
        .on('DELETE', (payload) => {
          const oldProfile = payload.old as Profile;
          setProfiles(profiles?.filter((p) => p.uuid !== oldProfile.uuid));
        })
        .subscribe();
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [appInformation?.id, profiles, signOut]);

  /**
   * Sends an invitaiton link to a specific profile
   * @param to_profile the profile to send he link
   */
  const _sendInvitation = async (to_profile: Profile) => {
    try {
      // send an app invitation
      const res = await sendInvitation({
        from_profile_id: profile?.uuid ?? '',
        to_profile_id: to_profile?.uuid ?? '',
        to_email: to_profile.email ?? '',
        app_information_id: appInformation?.id ?? ''
      });
      switch (res.status) {
        case 200:
          setSuccessText(
            `Successfully sent invitation to ${to_profile.email}!`
          );
          return;
        // duplicate account
        case 422:
          setLinkProfile(to_profile);
          setShowLinkProfileModal(true);
          break;
      }
    } catch (e) {
      console.error(e);
    }
    setErrorText(`Could not send invitation to ${to_profile.email}!`);
  };

  /**
   * Creates a table header
   * @param label
   * @param position where the header is in the table
   */
  const _renderHeader = (
    label: string | JSX.Element,
    position?: 'start' | 'end'
  ) => {
    const className = cn(
      'py-3.5 text-left text-sm font-semibold text-gray-900',
      {
        'pl-4 pr-3 sm:pl-6': position === 'start',
        'px-3': !position,
        'pl-3 pr-4 sm:pr-6': position === 'end'
      }
    );
    return (
      <th scope="col" className={className}>
        {label}
      </th>
    );
  };

  /**
   * @param profile the profile for this row
   * @returns the profile information for this row
   */
  const _renderRow = (profile: Profile) => {
    return (
      <tr key={profile.uuid}>
        {/* name */}
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {getName(profile)}
        </td>
        {/* organization */}
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {profile.organization}
        </td>
        {/* email */}
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {profile.email}
        </td>
        {/* roles */}
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {profile.roles?.map((roleId) => ProfileRoles[roleId]).join(', ') ??
            'No role'}
        </td>
        {/* actions */}
        <td className="relative w-[200px] whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          {/* if the profile is not yet connected */}
          {!profile.linked_to && (
            <Button
              color="tertiary"
              alt
              buttonProps={{
                className: 'mr-2',
                onClick: async () => {
                  // set loading state
                  setSendingInvitation(profile);
                  // send an invitation link
                  await _sendInvitation(profile);
                  setSendingInvitation(null);
                }
              }}
              loading={Boolean(sendingInvitation)}
            >
              Send Invitation
            </Button>
          )}
          <Button
            color="secondary"
            alt
            buttonProps={{
              // edit profile
              onClick: () => {
                passThroughSessionStorage(profile);
                router.push(`/leaders/${profile.uuid}`);
              }
            }}
          >
            Edit
          </Button>
          <span className="sr-only">Edit user</span>
        </td>
      </tr>
    );
  };

  /**
   * @param profile the profile for this row
   * @returns the profile information for this row
   */
  const _renderMobileRow = (profile: Profile, index: number) => {
    // conditional classes
    const className = cn('p-4', {
      'border-t-[1px]': index !== 0
    });
    return (
      <div className={className}>
        {/* roles */}
        <p className="text-xs text-secondary-600">
          {profile.roles?.map((roleId) => ProfileRoles[roleId]).join(', ') ??
            'No role'}
        </p>
        {/* name */}
        <p className="text-lg">{getName(profile)}</p>
        {/* email */}
        <p className="text-sm">{profile.email}</p>
        {/* organization */}
        <p className="text-sm">{profile.organization}</p>
        {/* if the profile is not yet connected */}
        {/* actions */}
        <div className="flex flex-row justify-between gap-3 mt-3">
          {/* if the profile is not yet connected */}
          {!profile.linked_to && (
            <Button
              color="tertiary"
              alt
              buttonProps={{
                className: 'flex-1',
                onClick: async () => {
                  // set loading state
                  setSendingInvitation(profile);
                  // send an invitation link
                  await _sendInvitation(profile);
                  setSendingInvitation(null);
                }
              }}
              loading={Boolean(sendingInvitation)}
            >
              Send Invitation
            </Button>
          )}
          {/* edit */}
          <Button
            color="secondary"
            alt
            buttonProps={{
              className: 'flex-1',
              // edit profile
              onClick: () => {
                passThroughSessionStorage(profile);
                router.push(`/leaders/${profile.uuid}`);
              }
            }}
          >
            Edit
          </Button>
          <span className="sr-only">Edit user</span>
        </div>
      </div>
    );
  };

  return (
    <DashboardSection
      title="Leaders"
      description="A list of all the leaders in your app including farmers, educators
    and volunteers."
      action={
        <Button
          color="secondary"
          startIcon={<HiPlus className="w-4 h-4" />}
          buttonProps={{
            // add a new leader
            onClick: () => router.push('/leaders/new')
          }}
        >
          Add leader
        </Button>
      }
      successText={successText}
      errorText={errorText}
    >
      {/* if accounts need to be linked */}
      <ConfirmationModal
        title="Account Already Exists"
        description={`There is already an account with email ${linkProfile?.email}. Would you like to link these accounts?`}
        visible={showLinkProfileModal}
        confirmText="Link accounts"
        onConfirm={async () => {
          if (!linkProfile) return;
          // link accounts
          const { error } = await linkUserToProfile(
            linkProfile.email ?? '',
            linkProfile.uuid ?? ''
          );
          // hide modal
          setShowLinkProfileModal(false);
          if (error) setErrorText(error.message);
          // show success alert
          else setSuccessText(`${linkProfile?.email} account linked!`);
        }}
        onClose={() => setShowLinkProfileModal(false)}
      />
      <Fade show={!loading}>
        {profiles ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {/* show rows */}
            {!mobile ? (
              <table className="w-full divide-y divide-gray-300">
                {/* headers */}
                <thead className="bg-gray-50">
                  <tr>
                    {_renderHeader('Name', 'start')}
                    {_renderHeader('Organization')}
                    {_renderHeader('Email')}
                    {_renderHeader('Role')}
                    {_renderHeader(
                      <span className="sr-only">Actions</span>,
                      'end'
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {profiles?.map((profile) => _renderRow(profile))}
                </tbody>
              </table>
            ) : (
              profiles?.map((profile, i) => _renderMobileRow(profile, i))
            )}
          </div>
        ) : (
          <p>No profiles found</p>
        )}
      </Fade>
    </DashboardSection>
  );
};

export default Leaders;
