import { Soil } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available soils */
export const getSoils = () => apiClientPublic.get<Array<Soil>>('/soils');
