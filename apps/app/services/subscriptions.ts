import { supabaseService } from '../lib/supabase-client';
import { Profile } from '../models/profile';
import { Subscription } from '../models/subscription';

// the table for this file
const table = 'subscriptions';
/**
 * Get a customer subscription by profile id
 * @param {Profile} profile profile of the user
 */
export const getSubscription = (profile: Profile) =>
  supabaseService
    .from<Subscription>(table)
    .select('*')
    .eq('owner_id', profile.uuid)
    .single();
/**
 * Creates a new subscription for the user, owner_id is automatically
 * set on the database
 * @param {Subscription} subscription set the customer's subscription from Stripe
 */
export const upsertSubscription = (subscription: Subscription) =>
  supabaseService
    .from<Subscription>(table)
    .upsert({ ...subscription })
    .eq('owner_id', subscription.owner_id)
    .single();

/**
 *  Updates a user's customer id
 * @param stripe_subscription_id the Stripe customer id
 * @param profile the user's existing profile
 * @returns
 */
export const updateStripeCustomerId = (
  stripe_subscription_id: string,
  profile: Profile
) =>
  supabaseService
    .from<Subscription>(table)
    .update({ stripe_subscription_id })
    .eq('owner_id', profile.uuid)
    .single();
