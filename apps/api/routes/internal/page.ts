import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createPage, updatePage } from "../../controllers/page.ts";

const router = new Router();
// craete a new page (plant object)
router.post("/page", createPage);
// updates a page given a revision id (for the plant object)
router.put("/page/:revision_id", updatePage);

export default router;
