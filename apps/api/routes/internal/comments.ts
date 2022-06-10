import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createComment } from "../../controllers/comments.ts";

const router = new Router();
// craete a new comment
router.post("/comment", createComment);

export default router;
