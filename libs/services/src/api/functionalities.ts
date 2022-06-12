import { apiClientPublic } from '..';

/* Get list of available functionalities */
export const getFunctionalities = () => apiClientPublic.get('/functionalities');
