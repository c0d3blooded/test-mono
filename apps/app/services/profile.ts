import { Profile } from '../models/profile';
import { supabase, supabaseService } from '../lib/supabase-client';
import omit from 'lodash.omit';

// the table for this file
export const table = 'profiles';

/**
 * @param {string} uuid the uuid of the supabase user
 * @returns User info/details for the given logged in user
 */
export const getProfilesByApp = (app_information_id: string) =>
  supabase
    .from<Profile>(table)
    .select('*')
    .eq('app_information_id', app_information_id);

/**
 * @param {string} uuid the uuid of the supabase user
 * @returns User info/details for the given logged in user
 */
export const getProfilesByUuid = (uuid: string) =>
  supabase.from<Profile>(table).select('*').eq('linked_to', uuid);

/**
 * @param {string} uuid the id of the profile
 * @returns User info/details
 */
export const getProfile = (uuid: string) =>
  supabase.from<Profile>(table).select('*').eq('uuid', uuid).single();

/**
 * Create a new user profile
 * @param {Profile} profile the profile object being updated in the database
 */
export const createProfile = (profile: Profile) =>
  supabase.from<Profile>(table).insert(profile);

/**
 * Update the user's profile
 * @param {Profile} profile the profile object being updated in the database
 */
export const updateProfile = (profile: Profile) =>
  supabase
    .from<Profile>(table)
    .update(omit(profile, ['uuid', 'email']))
    .eq('uuid', profile.uuid)
    .single();
/**
 * Links a Supabase user to a profile
 * @param email the Supabase user email
 * @param profile_id the id of the proifle
 */
export const linkUserToProfile = (email_input: string, profile_id: string) =>
  supabase.rpc('link_user_to_profile', {
    email_input,
    profile_id
  });
/**
 * Deletes any auto-generated profiles of the user when they accept an invitation
 * if they are not assigned to an existing app
 * @param uuid
 */
export const deleteRedundantProfiles = (uuid: string) =>
  supabaseService
    .from<Profile>(table)
    .delete()
    .is('app_information_id', null)
    .eq('uuid', uuid);
