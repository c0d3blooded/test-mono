import { Plant } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get a plant */
export const getPlant = (id: number) =>
  apiClientPublic.get<Plant>(`/plants/${id}`);
