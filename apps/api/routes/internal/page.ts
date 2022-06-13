import { Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { corsOptions } from '../../cors.ts';
import { createPage, updatePage } from '../../controllers/page.ts';

const router = new Router();
// craete a new page (plant object)
router.post('/page', oakCors(corsOptions), createPage);
// updates a page given a revision id (for the plant object)
router.put('/page/:revision_id', oakCors(corsOptions), updatePage);

export default router;
