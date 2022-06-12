import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import Stripe from 'stripe';
import { isValidJWT, parseJwt } from '@treelof/utils';
/**
 * API for stripe checkout sessions
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27'
});
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      // not a valid token
      if (!req.headers.authorization || !isValidJWT(req.headers.authorization))
        return res.status(401);

      const user = parseJwt(req.headers.authorization);
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: process.env.STRIPE_PRICE_ID_MONTHLY,
              quantity: 1
            }
          ],
          metadata: {
            uuid: user.sub // the user's uuid
          },
          allow_promotion_codes: true,
          customer_email: user.email,
          mode: 'subscription',
          success_url: `${req.headers.origin}/?payment-successful=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/sign-up/?payment-cancelled=true`
        });
        return res.send({ url: session.url });
      } catch (err: any) {
        return res.status(err.statusCode || 500).json(err.message);
      }
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
