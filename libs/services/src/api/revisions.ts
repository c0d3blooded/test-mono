import { CreateRevisionParameters } from '@treelof/models';
import { apiClientInternal, apiClientPublic } from '..';

/**
 * Get the revisions for this article
 * @param reference database table this is referencing
 * @param reference_id the id on that table
 */
export const getRevisions = (reference: 'plants', reference_id: string) =>
  apiClientPublic.get('/revisions', {
    params: { reference, reference_id }
  });

/**
 * Submit a new revision
 * @param revision the revision data
 */
export const createRevision = (revision: CreateRevisionParameters) =>
  apiClientInternal.post('/revisions', revision);
