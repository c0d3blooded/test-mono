import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import Cors from 'cors';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { DateTime } from 'luxon';
import initializeMiddleware from '../../../../lib/middleware';
import {
  Subscription,
  SubscriptionType
} from '@treelof/models';
import { upsertSubscription } from '../../../../services/subscriptions';
// diable body parsing for webhook verification
export const config = {
  api: {
    bodyParser: false
  }
};
/**
 * API for Stripe webhook management
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
});
// Initialize the cors middleware
const cors = initializeMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ['POST'],
    origin: 'https://api.stripe.com'
  })
);

/**
 * Indicates if the given Stripe subscription is a monthly subscription
 * @param stripeSubscription the Stripe subscription
 * @returns {boolean} if this is a monthly subscription
 */
const isMonthlySubscription = (stripeSubscription: Stripe.Subscription) => {
  try {
    const { data } = stripeSubscription.items;
    if (data.length > 0) {
      const { price } = data[0];
      return price.id === process.env.STRIPE_PRICE_ID_MONTHLY;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    // create new Stripe customer
    case 'POST':
      // get webhook secrect from configuration
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';
      // const webhookSecret =
      //   'whsec_2413c57bf2cf75c153d6e92ad263193c05dbcabb1943a7f8d48e83dde3591239';

      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      const buf = await buffer(req);
      const sig = req.headers['stripe-signature'] ?? '';

      try {
        // verify the webhook signature
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).end(err.message);
      }
      // Extract the object from the event.
      console.log(`webhook incoming: ${event.type}`);
      switch (event.type) {
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const stripe_subscription_id = session.subscription?.toString() ?? ''; // the new subscription id
          const stripeSubscription = await stripe.subscriptions.retrieve(
            stripe_subscription_id
          ); // get the stripe subscription object
          const uuid = session.metadata?.uuid as string; // the uuid of the user who checked out
          // no uuid saved indicates a bad session
          if (!uuid) return res.status(500);
          const subscription: Subscription = {
            owner_id: uuid,
            stripe_customer_id: session.customer?.toString(),
            stripe_subscription_id,
            type: isMonthlySubscription(stripeSubscription)
              ? SubscriptionType.Monthly
              : SubscriptionType.Yearly,
            contact_email: session.customer_email ?? '',
            is_active: true,
            last_payment_date: DateTime.now().toUTC().toISO()
          };
          // session metadata required
          await upsertSubscription(subscription);
          // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case 'invoice.paid':
          break;
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        case 'invoice.payment_failed':
          break;
        default:
          console.warn(`🤷 Unhandled event type: ${event.type}`);
      }
      return res.send({ success: true });
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
