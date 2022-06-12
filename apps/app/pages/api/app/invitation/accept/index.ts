import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import { AcceptInvitationParameters } from '@treelof/models';
import {
  deleteInvitationsByApp,
  deleteRedundantProfiles,
  getInvitationByCode,
  linkUserToProfile
} from '@treelof/services';
import { isValidJWT, parseJwt, uidFromJWT } from '@treelof/utils';

/* Accept an invitation sent by another user */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH':
      // not a valid token
      if (!req.headers.authorization || !isValidJWT(req.headers.authorization))
        return res.status(401);

      const { invitation_code } = req.body as AcceptInvitationParameters;
      // retrieve the existing invitation
      const { data: invitation, error: error_invitation } =
        await getInvitationByCode(invitation_code);
      if (error_invitation || invitation === null) {
        res.status(400);
        return res.send({ ...error_invitation });
      }
      const { email } = parseJwt(req.headers.authorization);
      // link the given session to the profile in the invitation
      const { error: error_link } = await linkUserToProfile(
        email,
        invitation.profile_id
      );
      if (error_link) {
        res.status(400);
        return res.send({ ...error_link });
      }

      // remove all the existing applications associated with this profile and app
      let { error } = await deleteInvitationsByApp(invitation);
      if (error) {
        res.status(500);
        return res.send({ ...error });
      }

      // delete auto-generated profile of the user if applicable
      const uid = uidFromJWT(req.headers.authorization);
      ({ error } = await deleteRedundantProfiles(uid));
      if (error) {
        res.status(500);
        return res.send({ ...error });
      }

      return res.send({ message: 'Invitation accepted!' });
    default:
      res.setHeader('Allow', 'PATCH');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
