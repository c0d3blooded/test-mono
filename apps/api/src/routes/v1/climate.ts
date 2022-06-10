import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getClimates, getClimate } from "../../controllers/climate.ts";

const router = new Router();
/**
 * @api [get] /climates
 * summary: Get climates
 * description: Returns a list of all available climates
 * tags:
 *  - climate
 * operationId: getClimates
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
 *              $ref: '#/components/schemas/climate'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/climates", getClimates);
/**
 * @api [get] /climates/{id}
 * summary: Get climate by id
 * description: Returns one climate by its id
 * tags:
 *  - climate
 * operationId: getClimate
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
 *            $ref: '#/components/schemas/climate'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/climates/:id", getClimate);

export default router;
