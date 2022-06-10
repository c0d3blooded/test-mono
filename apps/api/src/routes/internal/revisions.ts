import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createRevision } from "../../controllers/revisions.ts";

const router = new Router();
// create a new revision
router.post("/revisions", createRevision);

export default router;
