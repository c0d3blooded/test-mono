import { Edibility } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available edibilities */
export const getEdibilities = () =>
  apiClientPublic.get<Array<Edibility>>('/edibilities');
