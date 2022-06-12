import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import Stripe from 'stripe';
import { isValidJWT } from '@treelof/utils';
/**
 * API for stripe checkout sessions
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
});
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH':
      // not a valid token
      if (!req.headers.authorization || !isValidJWT(req.headers.authorization))
        return res.status(401);

      const { session_id } = req.body;
      if (!session_id) return res.status(500);
      else {
        try {
          // delete checkout Sessions from body params.
          const session = await stripe.checkout.sessions.expire(session_id);
          return res.send({ message: `session expired: ${session.id}` });
        } catch (err: any) {
          return res.status(err.statusCode || 500).json(err.message);
        }
      }
    default:
      res.setHeader('Allow', 'PATCH');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
