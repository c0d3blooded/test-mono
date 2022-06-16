/**
 * @schema revision
 * title: Revisions
 * description: A revision made to the article
 * type: object
 * properties:
 *   id:
 *     type: number
 *     description: The id of the revision
 *   field:
 *     type: string
 *     description: The field that was changed
 *   old_value:
 *     type: array
 *     items:
 *       type: string
 *     description: The list of old values (single item array for text fields)
 *   new_value:
 *     type: array
 *     items:
 *       type: string
 *     description: The list of new values (single item array for text fields)
 *   status:
 *     type: string
 *     description: The status of the revision
 *     enum: [pending, approved, rejected]
 *   reference:
 *     type: string
 *     description: What this is revising
 *   reference_id:
 *     type: string
 *     description: The id of the referenced revision
 *   created_at:
 *     type: string
 *     format: date-time
 *     description: When this revision was created
 * example:
 *  id: 12
 *  field: functionalities
 *  old_value: ['ground_cover']
 *  new_value: ['ground_cover', 'nectary']
 *  status: 'pending'
 *  reference: 'plants'
 *  reference_id: '1'
 *  created_at: '2017-07-21T17:32:28Z'
 */

import { Plant } from './plant';

// NOTE: Public responses do not expose all fields
export interface Revision {
  id: number;
  owner_id: string; // the user that made the change
  field: keyof Plant; // the field that was revised
  old_value: Array<string>; // the previous value
  new_value: Array<string>; // the new value
  status: RevisionStatus; // the status of this revision
  reference: RevisionReference; // what table this references
  reference_id: string; // the id of the reference
  approved_on?: string; // date time
  rejected_on?: string; // date time
  reviewed_by?: string; // the uuid of the reviewer
  created_at: string; // date time
}

export enum RevisionStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected'
}

// request to create a new revision
export interface CreateRevision {
  owner_id: string; // the user that made the change
  changes: Record<string, Array<string>>; // the previous value
  reference: RevisionReference; // what table this references
  reference_id: string; // the id of the reference
}

type RevisionReference = 'plants';
