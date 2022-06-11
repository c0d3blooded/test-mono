/* The current subscription of the user */
export interface Subscription {
  id?: string; // primary key
  owner_id?: string; // the owner of the subscription
  type?: SubscriptionType; // monthly/yearly subscription
  contact_email?: string; // the email used for checkout
  stripe_customer_id?: string; // the stripe customer
  stripe_subscription_id?: string; // the stripe subscription
  last_payment_date?: string; // the date of the last payment
  is_active?: boolean; // if the subscription is active
}

type SubscriptionType = 'monthly' | 'yearly';
type SubscriptionLabel = 'Monthly' | 'Yearly';

export const SubscriptionType: Record<SubscriptionLabel, SubscriptionType> = {
  Monthly: 'monthly',
  Yearly: 'yearly'
};
