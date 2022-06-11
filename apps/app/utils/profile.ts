import { Profile } from '@treelof/models';

/**
 * @param profile the profile object from the DB
 * @returns the user's name
 */
export const getName = (profile: Profile | null) =>
  profile ? `${profile.first_name} ${profile.last_name}`.trim() : '';
