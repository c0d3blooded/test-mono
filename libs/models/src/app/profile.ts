/* Contains information about a given authenticated user */
export interface Profile {
  uuid?: string; // primary key
  first_name?: string; // first name name of the user
  last_name?: string; // last name of the user
  email?: string; // email of the user
  address?: string; // street address
  city?: string; // city
  region?: string; // state / province
  postal_code?: string; // zip code
  organization?: string; // business or municipality
  app_information_id?: string; // the app information id of the user
  website?: string; // the user's website
  twitter_account?: string; // the user's twitter profile
  linked_to?: string; // the supabase user id this profile is linked to (there can be multiple of these)
  roles?: Array<string>; // the user's primary roles
  app_uses?: Array<string>; // what the user is using the app for
}

export enum ProfileRoles {
  Owner = 'owner',
  Administrator = 'admin',
  Farmer = 'farmer',
  Educator = 'educator',
  MarketOverseer = 'market-overseer',
}
