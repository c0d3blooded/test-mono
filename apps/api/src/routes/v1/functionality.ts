import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
  getFunctionalities,
  getFunctionality,
} from "../../controllers/functionality.ts";

const router = new Router();
/**
 * @api [get] /functionalities
 * summary: Get functionalities
 * description: Returns a list of all available functionalities
 * tags:
 *  - functionality
 * operationId: getFunctionalities
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
 *              $ref: '#/components/schemas/functionality'
 *   '500':
 *      $ref: '#/components/responses/500'
 */
router.get("/functionalities", getFunctionalities);
/**
 * @api [get] /functionalities/{id}
 * summary: Get functionality by id
 * description: Returns one functionality by its id
 * tags:
 *  - functionality
 * operationId: getFunctionality
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
 *            $ref: '#/components/schemas/functionality'
 *   '400':
 *      $ref: '#/components/responses/400'
 *   '404':
 *      $ref: '#/components/responses/404'
 */
router.get("/functionalities/:id", getFunctionality);

export default router;
