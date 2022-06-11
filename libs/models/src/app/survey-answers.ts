/* Answers to the additional information survey */
export interface SurveyAnswers {
  id?: string; // the uuid
  app_use?: Array<string>; // how the app will be used
  role?: string; // the role the user will be playing
  owner_id?: string; // the user who submitted the survey
  allow_messages?: boolean; // allow us to send messages
}
