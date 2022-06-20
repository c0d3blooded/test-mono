import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@treelof/components';
import { Profile } from '@treelof/models';

/**
 * @returns the general information section of the sign up form
 */
const SettingsProfile = () => {
  const { register, formState } = useFormContext<{
    profile?: Profile;
  }>();
  const { errors } = formState;

  return (
    <div className="grid grid-cols-6 gap-3 md:gap-6">
      {/* first name */}
      <div className="col-span-6 sm:col-span-3">
        <Input
          label="First name"
          inputProps={{
            autoComplete: 'given-name',
            ...register('profile.first_name', {
              required: 'Please enter your first name'
            })
          }}
          error={errors.profile?.first_name?.message}
        />
      </div>
      {/* last name */}
      <div className="col-span-6 sm:col-span-3">
        <Input
          label="Last name"
          inputProps={{
            autoComplete: 'family-name',
            ...register('profile.last_name', {
              required: 'Please enter your last name'
            })
          }}
          error={errors.profile?.last_name?.message}
        />
      </div>
      {/* business / municipality */}
      <div className="col-span-6">
        <Input
          label="Organization"
          hint="The organization you are representing (i.e. business or municipality)"
          inputProps={{
            placeholder: "(e.g. Bethel, CT Farmer's Market)",
            ...register('profile.organization', {
              required: 'Please enter your organization'
            })
          }}
          error={errors.profile?.organization?.message}
        />
      </div>
      {/* street address */}
      <div className="col-span-6">
        <Input
          label="Street address"
          inputProps={{
            autoComplete: 'street-address',
            ...register('profile.address', {
              required: 'Please enter your street address'
            })
          }}
          error={errors.profile?.address?.message}
        />
      </div>
      {/* city */}
      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
        <Input
          label="City"
          inputProps={{
            autoComplete: 'address-level2',
            ...register('profile.city', {
              required: 'Please enter your city'
            })
          }}
          error={errors.profile?.city?.message}
        />
      </div>
      {/* state or province */}
      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        <Input
          label="State / Province"
          inputProps={{
            autoComplete: 'address-level1',
            ...register('profile.region', {
              required: 'Please enter your state or province'
            })
          }}
          error={errors.profile?.region?.message}
        />
      </div>
      {/* zip code */}
      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        <Input
          label="ZIP / Postal code"
          inputProps={{
            type: 'text',
            autoComplete: 'postal-code',
            ...register('profile.postal_code', {
              required: 'Please enter your zip or postal code'
            })
          }}
          error={errors.profile?.postal_code?.message}
        />
      </div>
      {/* website */}
      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
        <Input
          label="Website (optional)"
          prefix="https://"
          inputProps={{
            type: 'text',
            ...register('profile.website')
          }}
        />
      </div>
      {/* twitter account */}
      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
        <Input
          label="Twitter Account (optional)"
          prefix="@"
          inputProps={{
            type: 'text',
            ...register('profile.twitter_account')
          }}
        />
      </div>
    </div>
  );
};

export default SettingsProfile;
