import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getZones, getZone } from "../../controllers/zone.ts";

const router = new Router();
/**
 * @api [get] /zones
 * summary: Get zones
 * description: Returns a list of all available zones
 * tags:
 *  - zone
 * operationId: getZones
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
 *              $ref: '#/components/schemas/zone'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/zones", getZones);
/**
 * @api [get] /zones/{id}
 * summary: Get zone by id
 * description: Returns one zone by its id
 * tags:
 *  - zone
 * operationId: getZone
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
 *            $ref: '#/components/schemas/zone'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/zones/:id", getZone);

export default router;
