import { Functionality } from '@treelof/models';
import { apiClientPublic } from '..';

/* Get list of available functionalities */
export const getFunctionalities = () =>
  apiClientPublic.get<Array<Functionality>>('/functionalities');
