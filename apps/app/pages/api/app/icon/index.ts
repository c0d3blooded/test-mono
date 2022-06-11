import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import * as colors from 'material-ui-colors';
import { withSentry } from '@sentry/nextjs';
import { AppIconParameters } from '../../../../models/api';
import { isValidJWT } from '../../../../services/api'; // Initialize the cors middleware
import {
  MaterialUIAccentColor,
  MaterialUIColor
} from '../../../../components/common/color-picker/color-picker';

const accentColors = {
  amberAccent: '#ffab40',
  blueAccent: '#448aff',
  cyanAccent: '#18ffff',
  deepOrangeAccent: '#ff6e40',
  deepPurpleAccent: '#7c4dff',
  greenAccent: '#69f0ae',
  indigoAccent: '#536dfe',
  lightBlueAccent: '#40c4ff',
  lightGreenAccent: '#b2ff59',
  limeAccent: '#eeff41',
  orangeAccent: '#ffab40',
  pinkAccent: '#ff4081',
  purpleAccent: '#e040fb',
  redAccent: '#ff5252',
  tealAccent: '#64ffda',
  yellowAccent: '#ffff00'
};

/**
 * @param color the color constant
 * @returns the hex value of the material ui constant
 */
const getMUIColorHex = (
  color: MaterialUIColor | MaterialUIAccentColor | 'white' | 'black'
) => {
  // accent colors
  if (color.includes('Accent')) return accentColors[color];
  switch (color) {
    case 'white':
      return '#ffffff';
    case 'black':
      return '#000000';
    default:
      return colors[color][500];
  }
};

/**
 * Retrieve a converted icon for the app
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      // not a valid token
      if (!req.headers.authorization || !isValidJWT(req.headers.authorization))
        return res.status(401);

      const params = req.query as unknown as AppIconParameters;
      const file = `public/icons/${params.file}.svg`; // the file being altered
      try {
        const filePath = path.resolve('.', file);
        let strSVG = fs.readFileSync(filePath).toString('utf8');
        // replace icon color
        strSVG = strSVG.replaceAll('#000000', getMUIColorHex(params.color));
        // replace background color
        strSVG = strSVG.replace(
          /#ffffff/,
          getMUIColorHex(params.backgroundColor)
        );
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(strSVG);
        // return res.send(
        //   'data:image/svg+xml;base64,' + Buffer.from(strSVG).toString('base64')
        // );
      } catch (err: any) {
        return res.status(err.statusCode || 500).json(err.message);
      }
    default:
      res.setHeader('Allow', 'GET');
      return res.status(405).end('Method Not Allowed');
  }
};

export default withSentry(handler as NextApiHandler);
