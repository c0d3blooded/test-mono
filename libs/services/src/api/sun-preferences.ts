import { SunPreference } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available sun preferences */
export const getSunPreferences = () =>
  apiClientPublic.get<Array<SunPreference>>('/sun-preferences');
