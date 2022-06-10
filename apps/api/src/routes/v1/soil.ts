import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getSoilTypes, getSoilType } from "../../controllers/soil.ts";

const router = new Router();
/**
 * @api [get] /soils
 * summary: Get soils
 * description: Returns a list of all available soils
 * tags:
 *  - soil
 * operationId: getSoils
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
 *              $ref: '#/components/schemas/soil'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/soils", getSoilTypes);
/**
 * @api [get] /soils/{id}
 * summary: Get soil by id
 * description: Returns one soil by its id
 * tags:
 *  - soil
 * operationId: getSoil
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
router.get("/soils/:id", getSoilType);

export default router;
