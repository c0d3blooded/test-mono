import axios from 'axios';

interface CreateRevision {
  owner_id: string; // the user that made the change
  changes: Record<string, Array<string>>; // the previous value
  reference: string; // what table this references
  reference_id: string; // the id of the reference
}

/**
 * Get the revisions for this article
 * @param reference database table this is referencing
 * @param reference_id the id on that table
 */
export const getRevisions = async (reference: 'plants', reference_id: string) =>
  axios.get('/revisions', {
    params: { reference, reference_id }
  });

/**
 * Submit a new revision
 * @param revision the revision data
 */
export const createRevision = async (revision: CreateRevision) =>
  axios.post('/revisions', revision, {
    baseURL: `${process.env.NEXT_PUBLIC_API_PAGE}/internal`
  });
