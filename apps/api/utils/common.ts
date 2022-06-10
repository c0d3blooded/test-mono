import { Request } from "https://deno.land/x/oak@v10.6.0/mod.ts";

/**
 * Validates that a request came from the website
 * @param context
 * @returns {boolean} if the request is valid
 */
export const validateDomain = (request: Partial<Request>) => {
  const urlExceptions = Deno.env.get("IGNORE_KEY_CHECK")?.split(",");
  // if the url is not an exception
  return urlExceptions?.includes(request.headers?.get("origin") ?? "");
};
