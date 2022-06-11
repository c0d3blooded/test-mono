import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import Stripe from 'stripe';
import Cors from 'cors';
import initializeMiddleware from '../../../../../lib/middleware';
import { Profile } from '@treelof/models';
import { updateStripeCustomerId } from '../../../../../services/subscriptions';
import { isAuthenticated } from '../../../../../utils/auth';
/**
 * API for stripe customer creation
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
      // create the customer on Stripe
      const customer = await stripe.customers.create({
        name: `${profile.first_name} ${profile.last_name}`.trim(),
        email: profile.email,
        metadata: {
          uuid: profile.uuid ?? ''
        }
      });
      // update the user's subscription data
      await updateStripeCustomerId(customer.id, profile);

      return res.send({ message: `stripe customer created: ${customer.id}` });
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
