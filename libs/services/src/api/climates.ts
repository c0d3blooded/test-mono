import { Climate } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available climates */
export const getClimates = () =>
  apiClientPublic.get<Array<Climate>>('/climates');
