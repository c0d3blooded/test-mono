import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { CreateFeedbackParameters } from '@treelof/models';
import { MailgunClient } from '@treelof/services';

/* Send feedback from the wiki page */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const { feedback, profile } = req.body as CreateFeedbackParameters;
      let text = `${feedback}   `;
      // if uuid included
      if (profile?.uuid) {
        text += `\n\n${profile.name}\n\n${profile.email}\n\n${profile.uuid}`;
      } else {
        text += '\n\nAnonymous';
      }
      // send the feedback
      await MailgunClient.messages
        .create(process.env.MAILGUN_DOMAIN ?? '', {
          from: 'Treelof Support <info@treelof.com>',
          to: 'treelofapp@gmail.com',
          subject: 'Treelof Wiki Feedback',
          text
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });

      return res.send({ message: 'Success!' });
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
