import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getLayer, getLayers } from "../../controllers/layer.ts";

const router = new Router();
/**
 * @api [get] /layers
 * summary: Get layers
 * description: Returns a list of all available layers
 * tags:
 *  - layer
 * operationId: getLayers
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
 *              $ref: '#/components/schemas/layer'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/layers", getLayers);
/**
 * @api [get] /layers/{id}
 * summary: Get layer by id
 * description: Returns one layer by its id
 * tags:
 *  - layer
 * operationId: getLayer
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
 *            $ref: '#/components/schemas/layer'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/layers/:id", getLayer);

export default router;
