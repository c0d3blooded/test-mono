import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import Stripe from 'stripe';
import Cors from 'cors';
import initializeMiddleware from '../../../../../lib/middleware';
import { Profile } from '@treelof/models';
import { getSubscription } from '../../../../../services/subscriptions';
import { isAuthenticated } from '../../../../../utils/auth';
/**
 * API for stripe customer updating
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
});
// Initialize the cors middleware
const cors = initializeMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ['POST'],
    origin: 'https://app.supabase.io'
  })
);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  // authenticate request
  if (!isAuthenticated(req)) return res.status(401).send('Unauthorized');
  switch (req.method) {
    // create new Stripe customer
    case 'POST':
      const profile = req.body.record as Profile;
      const { data: subscription } = await getSubscription(profile);
      // check for existing stripe customer
      if (!subscription?.stripe_customer_id)
        return res.status(500).send('no customer found');
      // update the customer on stripe
      const customer = await stripe.customers.update(
        subscription?.stripe_customer_id,
        {
          name: `${profile.first_name} ${profile.last_name}`.trim(),
          email: profile.email,
          metadata: {
            uuid: profile.uuid ?? ''
          }
        }
      );
      return res.send({ message: `stripe customer updated: ${customer.id}` });
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
