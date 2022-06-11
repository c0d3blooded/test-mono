export interface SupabaseJWT {
  aud: string; // audience/role
  sub: string; // the uuid of the user
  role: string; // the user's role
  email: string; // the user's email
  exp: number; // expiration time
  user_metadata: {
    avatar_url: string;
    email: string;
    email_verified: boolean;
    full_name: string;
    iss: string; // the issuer
    name: string; // full name
    picture: string;
    provider_id: string; // the id from the provider
    sub: string; // the id from the provider
  };
}
