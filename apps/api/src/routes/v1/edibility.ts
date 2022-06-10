import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getEdibilities, getEdibility } from "../../controllers/edibility.ts";

const router = new Router();
/**
 * @api [get] /edibilities
 * summary: Get edibilities
 * description: Returns a list of all available edibilities
 * tags:
 *  - edibility
 * operationId: getEdibilities
 * security:
 *   - ApiKeyAuthorization: []
 * responses:
 *   '200':
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/edibility'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/edibilities", getEdibilities);
/**
 * @api [get] /edibilities/{id}
 * summary: Get edibility by id
 * description: Returns one edibility by its id
 * tags:
 *  - edibility
 * operationId: getEdibility
 * security:
 *   - ApiKeyAuthorization: []
 * parameters:
 *   - $ref: '#/components/parameters/id'
 * responses:
 *   '200':
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/soil'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/edibilities/:id", getEdibility);

export default router;
