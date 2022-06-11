import { AppInformation, Profile } from '@treelof/models';

/**
 * Checks if a given email is valid
 * @param value the value of the string
 * @returns {string | boolean} error string if the email is not valud
 */
export const validateEmail = (value: string) => {
  const isValidEmail =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      value
    );
  if (!isValidEmail) return 'Pleae enter a valid email address';
  return true;
};

/**
 * Indicates that a member has completed filling out their
 * profile information
 * @param profile the member's profile
 * @returns {boolean} is the profile info complete
 */
export const isGeneralInformationComplete = (profile: Profile | null) => {
  if (!profile) return false;
  return (
    profile.first_name &&
    profile.last_name &&
    profile.address &&
    profile.city &&
    profile.region &&
    profile.postal_code &&
    profile.organization
  );
};

/**
 * Indicates that a member has completed filling out their
 * app information
 * @param appInformation the app information
 * @returns {boolean} is the app infromation info complete
 */
export const isMobileAppInformationComplete = (
  appInformation?: AppInformation
) => {
  if (!appInformation) return false;
  return (
    appInformation.short_title &&
    appInformation.long_title &&
    appInformation.short_description &&
    appInformation.long_description &&
    appInformation.primary_color &&
    appInformation.secondary_color
  );
};
