import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { withSentry } from '@sentry/nextjs';
import fs from 'fs';
import { CreateInvitationParameters } from '../../../../../models/api';
import { supabaseService } from '../../../../../lib/supabase-client';
import MailgunClient from '../../../../../lib/mailgun';
import { isValidJWT } from '../../../../../services/api'; // Initialize the cors middleware
import { table as app_information_table } from '../../../../../services/app-information';
import { table as profile_table } from '../../../../../services/profile';
import { Invitation } from '../../../../../models/invitation';
import { Profile } from '../../../../../models/profile';
import { generateInvitationUrl } from '../../../../../utils/invitation';
import { AppInformation } from '../../../../../models/app-information';
import { replaceEmailTemplateValue } from '../../../../../utils/common';
import { getName } from '../../../../../utils/profile';
import { createInvitation } from '../../../../../services/invitation';
import { DateTime } from 'luxon';

/* Send an invitation link to a user */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      // not a valid token
      if (!req.headers.authorization || !isValidJWT(req.headers.authorization))
        return res.status(401);

      const params = req.body as CreateInvitationParameters;
      // get existing profiles by email
      const { count, error: error_existing } = await supabaseService
        .from<Profile>(profile_table)
        // get count only, no rows
        .select('*', { count: 'exact', head: true })
        .eq('email', params.to_email);

      if (error_existing) {
        res.status(500);
        return res.send({ ...error_existing });
      }
      // if the count is greater than 1, there is an existing account
      if (count && count >= 2) {
        res.status(422);
        return res.send({ messsage: 'Account already exists' });
      }
      // get inviting user's profile
      const { data: profile_inviter, error: error_inviter } =
        await supabaseService
          .from<Profile>(profile_table)
          .select('first_name,last_name,email')
          .eq('uuid', params.from_profile_id)
          .single();

      if (error_inviter) {
        res.status(500);
        return res.send({ ...error_inviter });
      }
      // get app information
      const { data: app_information, error: error_app_info } =
        await supabaseService
          .from<Pick<AppInformation, 'id' | 'long_title'>>(
            app_information_table
          )
          .select('long_title')
          .eq('id', params.app_information_id)
          .single();
      if (error_app_info) {
        res.status(500);
        return res.send({ ...error_app_info });
      }
      // create invitation code
      const invitation_code = crypto.randomBytes(10).toString('base64');
      const invitation: Invitation = {
        app_information_id: params.app_information_id,
        email: params.to_email,
        profile_id: params.to_profile_id,
        invitation_code,
        expires: DateTime.now().plus({ hours: 72 }).toISO() // expires in 72
      };
      console.log(DateTime.now().plus({ hours: 72 }).toISO());
      const invitation_url = generateInvitationUrl(
        invitation,
        process.env.HOST_URL ?? ''
      );
      const filePath = 'public/email-templates/account-activation.html'; // the file being altered
      // get email template
      let template = fs.readFileSync(filePath).toString('utf8');
      template = replaceEmailTemplateValue(
        template,
        'name',
        getName(profile_inviter)
      );
      template = replaceEmailTemplateValue(
        template,
        'long_title',
        app_information.long_title
      );
      template = replaceEmailTemplateValue(template, 'link', invitation_url);
      // replace template values
      const messageData = {
        from: 'Treelof Support <info@treelof.com>',
        to: params.to_email,
        subject: `An invitation to join ${app_information.long_title}`,
        html: template,
        inline: [
          {
            data: await fs.promises.readFile('public/email-templates/logo.png'),
            filename: 'logo.png'
          },
          {
            data: await fs.promises.readFile(
              'public/email-templates/check.png'
            ),
            filename: 'check.png'
          }
        ]
      };

      // create invitation on Supabase
      const { error: error_invite } = await createInvitation(invitation);
      if (error_invite) {
        res.status(500);
        return res.send({ ...error_invite });
      }

      // send the invitation link
      await MailgunClient.messages
        .create(process.env.MAILGUN_DOMAIN ?? '', messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });

      return res.send({ message: 'Invitation sent!' });
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
