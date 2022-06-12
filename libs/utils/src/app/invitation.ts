import { Invitation } from '@treelof/models';

/**
 * Creates a url for an invited member to access
 * @param invitation
 */
export const generateInvitationUrl = (invitation: Invitation, host: string) =>
  `${host}?code=${encodeURIComponent(invitation.invitation_code)}`;
