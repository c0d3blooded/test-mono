import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getRevisions } from "../../controllers/revisions.ts";

const router = new Router();
/**
 * @api [get] /revisions
 * summary: Get revisions
 * description: Returns a list of revisions for the given artifact
 * tags:
 *  - revision
 * operationId: getRevisions
 * security:
 *   - ApiKeyAuthorization: []
 * parameters:
 *   - in: query
 *     name: reference
 *     schema:
 *       type: string
 *       enum: [plants]
 *     required: true
 *     description: The class of the artifact
 *   - in: query
 *     name: reference_id
 *     schema:
 *       type: string
 *     required: true
 *     description: The id of the artifact
 * responses:
 *   '200':
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/revision'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/revisions", getRevisions);

export default router;
