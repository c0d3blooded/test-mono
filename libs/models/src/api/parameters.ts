import { MaterialUIAccentColor, MaterialUIColor } from '../app/colors';

// ---------- TREELOF API PARAMETERS ----------

// ---------- INTERNAL APP PARAMETERS ----------
export type IconColor =
  | MaterialUIColor
  | MaterialUIAccentColor
  | 'white'
  | 'black';

export type IconOption =
  | 'apple'
  | 'banana'
  | 'carrot'
  | 'flower'
  | 'leaf'
  | 'pear'
  | 'tree'
  | 'custom';

// parameters for the app icon endpoint
export interface AppIconParameters {
  file: IconOption; // the default icon
  color: IconColor; // the icon color
  backgroundColor: IconColor; // the background color
}

// send invitation link
export interface CreateInvitationParameters {
  app_information_id: string; // the id of the app
  to_profile_id: string; // the id of the member's profile this invitation will be linked to
  to_email: string; // the email of the member's profile this invitation will be linked to
  from_profile_id: string; // the profile sending this invitation
}

// accept invitation link
export interface AcceptInvitationParameters {
  invitation_code: string; // the code of the invitation
}
