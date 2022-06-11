/** File for internal API routes */
import isempty from 'lodash.isempty';
import { supabase } from '../lib/supabase-client';
import { AppIconParameters } from '@treelof/models';
import { parseJwt } from '../utils/auth';

/** Get the user's id from the given OAuth token
 * @param {string} token the access token of the user
 * @returns {string} the uid
 */
export const uidFromJWT = (token: string) => {
  const body = parseJwt(token);
  return body.sub;
};

/** Indicates if the given token is from the right instance
 * @param {string} token the access token of the user
 * @returns {boolean} if the token is from supabase
 */
export const isValidJWT = (token: string) => {
  const body = parseJwt(token);
  return Boolean(body.email);
};

/**
 * Converts object to parameters
 * @param values the values being converted
 * @returns {string} the parameters
 */
const paramsToString = (values: Record<string, any>) => {
  // only return if there are values
  if (!isempty(values)) {
    const strValues = Object.keys(values).map((key) => `${key}=${values[key]}`);
    return `?${strValues.join('&')}`;
  }
  return '';
};

/**
 * @param {string} token the access token of the user
 * @returns redirects user to checkout screen
 */
export const getAppIcon = async (params: AppIconParameters) => {
  const session = supabase.auth.session();
  return await fetch(`/api/app/icon${paramsToString(params)}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: session?.access_token ?? '',
      'Content-Type': 'application/json'
    }
  });
};

/**
 * @param {string} token the access token of the user
 * @returns redirects user to checkout screen
 */
export const redirectToCheckout = async () => {
  const session = supabase.auth.session();
  const res = await fetch('/api/stripe/checkout/session/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: session?.access_token ?? '',
      'Content-Type': 'application/json'
    }
  });
  const body = await res.json();
  window.location.href = body.url;
};

/**
 * @param {string} session_id the sesion id from stripe
 * @param {string} token the access token of the user
 * @returns expires a Stripe checkout session
 */
export const deleteStripeSession = async (session_id: string) => {
  const session = supabase.auth.session();
  return await fetch('/api/stripe/checkout/session/delete', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: session?.access_token ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_id
    })
  });
};
