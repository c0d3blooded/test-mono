import { apiClientPublic } from '..';

/* Get list of available sun preferences */
export const getSunPreferences = () => apiClientPublic.get('/sun-preferences');
