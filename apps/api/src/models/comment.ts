export interface Comment {
  id: number;
  created_at: string; // date time
  owner_id: string; // the user that made the change
  comment: string; // the comment text
  reference: CommentReference; // what table this references
  reference_id: string; // the id of the reference
}

type CommentReference = "plants" | "revisions";
