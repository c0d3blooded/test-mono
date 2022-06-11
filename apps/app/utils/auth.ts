import { NextApiRequest } from 'next';
import { SupabaseJWT } from '@treelof/models';

/**
 * Indicates if the caller of this endpoint is authenticated
 * @param req the incoming API request
 * @returns {boolean} if the caller is authenticated
 */
export const isAuthenticated = (req: NextApiRequest) => {
  // authenticate endpoint
  if (req.headers['Treelof-API-Key'] !== process.env.API_KEY) return true;
  return false;
};
/**
 * Parses a given JWT (JSON web token)
 * @param token the JWT
 * @returns the JSON object represented in the token
 */
export const parseJwt = (token: string): SupabaseJWT => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};
