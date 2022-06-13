import { Zone } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available zones */
export const getZones = () => apiClientPublic.get<Array<Zone>>('/zones');
