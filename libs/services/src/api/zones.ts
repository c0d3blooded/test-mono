import { apiClientPublic } from '..';

/* Get list of available zones */
export const getZones = () => apiClientPublic.get('/zones');
