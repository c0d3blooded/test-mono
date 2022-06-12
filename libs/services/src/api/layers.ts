import { apiClientPublic } from '..';

/* Get list of available layers */
export const getLayers = () => apiClientPublic.get('/layers');
