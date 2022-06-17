import { CreateWikiPageParameters, Plant } from '@treelof/models';
import { apiClientInternal } from '..';

/**
 * Submit a request for a new page
 * @param params the page parameters
 */
export const createPage = (params: CreateWikiPageParameters) =>
  apiClientInternal.post<Plant>('/page', params);
