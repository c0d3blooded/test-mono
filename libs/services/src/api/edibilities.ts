import { apiClientPublic } from '..';

/* Get list of available edibilities */
export const getEdibilities = () => apiClientPublic.get('/edibilities');
