import { Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { corsOptions } from '../../cors.ts';
import { createComment } from '../../controllers/comments.ts';

const router = new Router();
// craete a new comment
router.post('/comment', oakCors(corsOptions), createComment);

export default router;
