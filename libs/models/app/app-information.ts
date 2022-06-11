import {
  MaterialUIAccentColor,
  MaterialUIColor
} from '../components/common/color-picker/color-picker';

/* Meta information required for creating, submitting and updating an app on the App/Play Store */
export interface AppInformation {
  id?: string;
  owner_id?: string; // the owner of the app
  short_title?: string; // the title shown under the app icon on the user's phone
  long_title?: string; // the full app store title
  short_description?: string; // the app store tagline description
  long_description?: string; //the full app store description
  icon_url?: string; // the url of the saved icon
  primary_color?: MaterialUIColor | MaterialUIAccentColor; // the app's primary color (material ui, no accent colors)
  secondary_color?: MaterialUIColor | MaterialUIAccentColor; // the app's accent/secondary color (material ui)
  bundle_id?: string; // the bundle id for this app
  twitter_handle?: string; // the app's twitter account
}

export enum AppInformationStatus {
  Pending = 'Pending',
  InReview = 'In Review',
  Active = 'Active',
  Denied = 'Denied'
}
