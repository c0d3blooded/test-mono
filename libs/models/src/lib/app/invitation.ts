// an invitation to a user via email, should be linked to a created profile
export interface Invitation {
  id?: number;
  app_information_id: string; // the app_information this is linked to
  profile_id: string; // the profile this is linked to
  invitation_code: string; // the unique invitation code
  email: string; // where the invitation was sent to
  expires: string; // ISO date to indicate expiration
}
