import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getPlant, getPlants } from "../../controllers/plant.ts";

const router = new Router();
/**
 * @api [get] /plants
 * summary: Get plants
 * description: Returns a list of all available plants
 * tags:
 *  - plant
 * operationId: getPlants
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
 *              $ref: '#/components/schemas/plant'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/plants", getPlants);
/**
 * @api [get] /plants/{id}
 * summary: Get plant by id
 * description: Returns one plant by its id
 * tags:
 *  - plant
 * operationId: getPlant
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
 *            $ref: '#/components/schemas/plant'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/plants/:id", getPlant);

export default router;
