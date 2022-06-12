import { apiClientPublic } from '..';

/* Get list of available soils */
export const getSoils = () => apiClientPublic.get('/soils');
