import { Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { corsOptions } from '../../cors.ts';
import { createRevision } from '../../controllers/revisions.ts';

const router = new Router();
// create a new revision
router.post('/revisions', oakCors(corsOptions), createRevision);

export default router;
