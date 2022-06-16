import { Revision } from '@treelof/models';
import { DateTime } from 'luxon';

/**
 * Returns the most relevant date for a given revision
 * @param revision
 */
export const getRevisionDate = (revision: Revision) => {
  // approved on date
  if (revision.approved_on) return DateTime.fromISO(revision.approved_on);
  // rejected date
  else if (revision.rejected_on) return DateTime.fromISO(revision.rejected_on);
  // created date
  else return DateTime.fromISO(revision.created_at);
};
