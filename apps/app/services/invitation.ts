import { supabase, supabaseService } from '../lib/supabase-client';
import {
  AcceptInvitationParameters,
  CreateInvitationParameters
} from '@treelof/models';
import { Invitation } from '@treelof/models';

// the table for this file
export const table = 'invitations';

/**
 * Send an app invitation to a user via email
 * @param params the invitation parameters
 */
export const sendInvitation = async (params: CreateInvitationParameters) => {
  const session = supabase.auth.session();
  return await fetch('/api/app/invitation/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: session?.access_token ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
};

/**
 * Send an app invitation to a user via email
 * @param params the invitation parameters
 */
export const acceptInvitation = async (params: AcceptInvitationParameters) => {
  const session = supabase.auth.session();
  return await fetch('/api/app/invitation/accept', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: session?.access_token ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
};

/**
 * Create a new app invitation
 * @param invitation the invitation object being created in the database
 */
export const createInvitation = (invitation: Invitation) =>
  supabaseService.from<Invitation>(table).insert(invitation);

/**
 * Get an app invitation by its unique code
 * @param invitation_code
 */
export const getInvitationByCode = (invitation_code: string) =>
  supabaseService
    .from<Invitation>(table)
    .select('*')
    .eq('invitation_code', invitation_code)
    .single();

/**
 * Deletes all invitations by the profile-app_information combination
 * @param invitation
 */
export const deleteInvitationsByApp = (invitation: Invitation) =>
  supabaseService.from<Invitation>(table).delete().match({
    app_information_id: invitation.app_information_id,
    profile_id: invitation.profile_id
  });
