import { apiClientPublic } from '..';

/* Get list of available climates */
export const getClimates = () => apiClientPublic.get('/climates');
